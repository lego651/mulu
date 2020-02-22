const headers = document.querySelectorAll("h1,h2,h3,h4");
console.log(headers);

const navi = document.createElement('div');
navi.id = "medium-ready-container";
navi.style.display = "block";
navi.style.padding = '50px';
navi.style.position = 'fixed';
navi.style.top = '100px';
navi.style.right = '0px';
navi.style.backgroundColor = 'rgba(0,0,0,.15)';
navi.style.borderRadius = '15px';

headers.forEach((h) => {
	if(h.innerHTML && h.innerHTML.length !== 0 && h.innerHTML.length < 40) {
		let hDiv = document.createElement('div');
		hDiv.textContent = h.innerHTML;
		if(h.tagName === "H1") {
			hDiv.classList.add("item-h1");
			hDiv.style.fontWeight = "bold";
			hDiv.style.fontSize = "22px";
			hDiv.style.cursor = "pointer";
		} else if(h.tagName === "H2") {
			hDiv.classList.add("item-h2");
			hDiv.style.fontSize = "20px";
			hDiv.style.cursor = "pointer";
		} else if(h.tagName === "H3") {
			hDiv.classList.add("item-h1");
			hDiv.style.fontWeight = "bold";
			hDiv.style.fontSize = "18px";
			hDiv.style.cursor = "pointer";
		} else if(h.tagName === "H4") {
			hDiv.classList.add("item-h2");
			hDiv.style.fontSize = "15px";
			hDiv.style.cursor = "pointer";
		}
		hDiv.addEventListener("click", function() {
			// h.scrollIntoView({
			// 	behavior: "smooth"
			// });
			const offset = 100;
			const bodyRect = document.body.getBoundingClientRect().top;
			const elementRect = h.getBoundingClientRect().top;
			const elementPosition = elementRect - bodyRect;
			let offsetPosition = elementPosition - offset;
			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth"
			})
		});
		navi.append(hDiv);
	}
});

// document.body.appendChild(navi);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.data === "open") {
		navi.style.display = "block";
		document.body.appendChild(navi);
	} else if(request.data === "close") {
		navi.style.display = "none";
	}
});

chrome.storage.sync.get('isOpen', function(data) {
	if(data.isOpen) {
		navi.style.display = "block";
		document.body.appendChild(navi);
	} else {
		navi.style.display = "none";
		document.body.removeChild(navi);
	}
});



