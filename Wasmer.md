[https://wasmer.io/](https://wasmer.io/)

- [[WASI]]準拠の[[WASM]]ランタイム
- ドキュメント: [https://docs.rs/wasmer/latest/wasmer/](https://docs.rs/wasmer/latest/wasmer/)
- Rust API
	- Example: [https://github.com/wasmerio/wasmer/tree/master/examples](https://github.com/wasmerio/wasmer/tree/master/examples)
	- ```サンプルコード,		use std::{env, process::exit};
		use tokio::runtime::Runtime;
		use wasmer::{Store, Module};
		use wasmer_wasix::WasiEnv;
		
		fn main() {
		    let args: Vec<String> = env::args().collect();
		    if args.len() != 2 { exit(1) }
		
		    let rt = Runtime::new().expect("Error: Tokio Runtime");
		
		    rt.block_on(async {
		        // Load
		        let wasm_filename = &args[1];
		        let wasm_bytes = std::fs::read(wasm_filename).expect("Error: Wasmファイルの読み込みに失敗");
		
		        // Create Store
		        let mut store = Store::default();
		
		        // Compile
		        let module = Module::new(&store, wasm_bytes).expect("Error: コンパイル失敗");
		
		        // wasi(x) env
		        let wasi_env_builder = WasiEnv::builder("progname");
		
		        let (instance, env) = wasi_env_builder.instantiate(module, &mut store).expect("Error: インスタンス化に失敗");
		        let start_func = instance.exports.get_function("_start").expect("Error: _start関数がない");
		
		        let result = start_func.call(&mut store, &[]);
		        match result {
		            Ok(v) => {
		                println!("Success: {:?}", v);
		            }
		            Err(e) => {
		                println!("Runtime error: {}", e.message());
		            }
		        }
		    })
		}
		```
- C API
	- [https://github.com/wasmerio/wasmer/tree/master/lib/c-api](https://github.com/wasmerio/wasmer/tree/master/lib/c-api)
	- ドキュメント: [https://wasmerio.github.io/wasmer/crates/doc/wasmer_c_api/](https://wasmerio.github.io/wasmer/crates/doc/wasmer_c_api/)
	- Examples: [https://github.com/wasmerio/wasmer/tree/master/lib/c-api/examples](https://github.com/wasmerio/wasmer/tree/master/lib/c-api/examples)
	- ```サンプルコード,		#include <malloc/_malloc.h>
		#include <stdio.h>
		#include <stddef.h>
		#include <string.h>
		#include "headers/wasm.h"
		#include "headers/wasmer.h"
		
		
		
		void print_wasmer_error() {
		    int error_len = wasmer_last_error_length();
		    if (error_len > 0) {
		        printf("Error len: `%d`\n", error_len);
		        char *error_str = malloc(error_len);
		        wasmer_last_error_message(error_str, error_len);
		        fprintf(stderr, "Error str: `%s`\n", error_str);
		        free(error_str);
		    }
		}
		
		
		
		int main(int argc, const char* argv[]) {
		    // Args check
		    // ./runner file.wasm func_name
		    if (argc <= 2) {
		        fprintf(stderr, "Error: argc <= 2\n");
		        return 1;
		    }
		
		
		    // Init
		    wasm_engine_t* engine = wasm_engine_new();
		    wasm_store_t* store = wasm_store_new(engine);
		
		    // Setup WASI
		    wasi_config_t* config = wasi_config_new("prog_name");
		
		    // Load binary
		    FILE* file = fopen(argv[1], "rb");
		    if (!file) {
		        fprintf(stderr, "Cannot open %s\nFailed to load wasm...\n", argv[1]);
		        return 1;
		    }
		    fseek(file, 0L, SEEK_END);
		    size_t file_size = ftell(file);
		    fseek(file, 0L, SEEK_SET);
		
		    wasm_byte_vec_t binary;
		    wasm_byte_vec_new_uninitialized(&binary, file_size);
		    if (fread(binary.data, file_size, 1, file) != 1) {
		        fprintf(stderr, "Error: initializing module\n");
		        return 1;
		    }
		    fclose(file);
		
		    // Create module (Compile)
		    wasm_module_t* module = wasm_module_new(store, &binary);
		    if (!module) {
		        fprintf(stderr, "Error: compiling module\n");
		        return 1;
		    }
		    wasm_byte_vec_delete(&binary);
		
		    // Init wasi env
		    wasi_env_t* wasi_env = wasi_env_new(store, config);
		    if (!wasi_env) {
		        fprintf(stderr, "Error: building WASI env\n");
		        return 1;
		    }
		
		    // WASI Imports
		    wasm_extern_vec_t imports;
		    bool get_imports_result = wasi_get_imports(store, wasi_env, module, &imports);
		    if (!get_imports_result) {
		        fprintf(stderr, "Failed to getting wasi imports\n");
		        return 1;
		    }
		
		    wasm_instance_t* instance = wasm_instance_new(store, module, &imports, NULL);
		    if (!instance) {
		        fprintf(stderr, "Error instantiating module\n");
		        print_wasmer_error();
		        return 1;
		    }
		
		    if (!wasi_env_initialize_instance(wasi_env, store, instance)) {
		        fprintf(stderr, "Error initializing wasi env memory");
		        print_wasmer_error();
		        return 1;
		    }
		
		    wasm_extern_vec_t exports;
		    wasm_instance_exports(instance, &exports);
		
		    wasm_exporttype_vec_t export_types;
		    wasm_module_exports(module, &export_types);
		    for (size_t i = 0; i < export_types.size; i++) {
		        wasm_exporttype_t* exptype = export_types.data[i];
		        if (wasm_externtype_kind(wasm_exporttype_type(exptype)) == WASM_EXTERN_FUNC) {
		            const wasm_name_t* exp_name = wasm_exporttype_name(exptype);
		            char *func_name = malloc(exp_name->size + 1);
		            for (size_t j = 0; j < exp_name->size; j++) {
		                func_name[j] = exp_name->data[j];
		            }
		            func_name[exp_name->size] = '\0';
		
		            if (strcmp(func_name, argv[2]) == 0) {
		                // hit
		                fprintf(stderr, "calling...\n");
		                wasm_val_t func_res_val[1] = { WASM_INIT_VAL };
		                wasm_val_vec_t func_res = WASM_ARRAY_VEC(func_res_val);
		                wasm_func_t* target_func = wasm_extern_as_func(exports.data[i]);
		                if (wasm_func_call(target_func, NULL, &func_res)) {
		                    fprintf(stderr, "Failed calling the add function\n");
		                    print_wasmer_error();
		                    return 1;
		                }
		                printf("%s: %d\n", func_name, func_res_val[0].of.i32);
		                wasm_func_delete(target_func);
		            }
		            free(func_name);
		        }
		    }
		
		     // Shut down
		    wasi_env_delete(wasi_env);
		    wasm_module_delete(module);
		    wasm_instance_delete(instance);
		    wasm_store_delete(store);
		    wasm_engine_delete(engine);
		
		    fprintf(stderr, "bye\n");
		}
		
		```
