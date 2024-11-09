- 人気[[自作キーボード]]である[[keyball]]には、[[トラックボール]]が付いている
- トラックボールでカーソル移動ができるが、どうも上下左右それぞれ逆さまな気がする(一般的なトラックボールと比べて)
- [[QMK Firmware]]をイジればいい
- qmk_firmware/keyboards/keyball/lib/keyball/keyball.cの`pointing_device_driver_get_report`の`d.x`, `d.y`の符号を反転させることで、移動を反転させることができる
	- [keyball/qmk_firmware/keyboards/keyball/lib/keyball/keyball.c at ab40534f168bdc0d6baa69dabed4c82dfd4aaccc · Yowkees/keyball · GitHub](https://github.com/Yowkees/keyball/blob/ab40534f168bdc0d6baa69dabed4c82dfd4aaccc/qmk_firmware/keyboards/keyball/lib/keyball/keyball.c#L273)
	- ```new,		report_mouse_t pointing_device_driver_get_report(report_mouse_t rep) {
		    // fetch from optical sensor.
		
		    if (keyball.this_have_ball) {
		        pmw3360_motion_t d = {0};
		        if (pmw3360_motion_burst(&d)) {
		            ATOMIC_BLOCK_FORCEON {
		                keyball.this_motion.x = add16(keyball.this_motion.x, -1 * d.x);  // 変更箇所
		                keyball.this_motion.y = add16(keyball.this_motion.y, -1 * d.y);  // 変更箇所
		            }
		        }
		    }
		    ...(省略)
		}
		```