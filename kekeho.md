![[assets/642d2fda225a42001c17229f.png]]

- [https://kekeho.net](https://kekeho.net)
- リンク集
	- [https://www.kekeho.net/#links](https://www.kekeho.net/#links)

```script.js
function insertTemplateButton() {
	console.log('Insert Template Button');
	const templates = [
		{
			id: 'paper', icon: '📄',
			f: function () {
				// TODO: テンプレート挿入をする
				alert('論文読もうね');
			}
		}
	];

	for (let i = 0; i < templates.length; i++) {
		// TODO: ページが変わると消えちゃうのをなんとかする
  		let pageMenu = document.getElementsByClassName('page-menu')[0];
    	let templateButtonBox = document.createElement('div');
    	templateButtonBox.setAttribute('class', 'dropdown');
    	let templateButton = document.createElement('button');
    	templateButton.onclick = templates[i].f;
    	templateButton.innerText = templates[i].icon;
    	templateButton.setAttribute('class', 'tool-btn dropdown-toggle');
    	templateButtonBox.appendChild(templateButton);
    	pageMenu.appendChild(templateButtonBox);
	}
}

// Execute
insertTemplateButton();

```
