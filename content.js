const headers = document.querySelectorAll("h1,h2,h3,h4");
console.log(headers);

const blockedWords = [
	"</a>",
	"</button>",	
	"<!-- -->",
	"Explore your membership",
];

const hasBlockedWord = (str, blockedWords) => {
	console.log(str);
	for(let word of blockedWords) {
		console.log(word);
		if(str.includes(word)) {
			return true;
		}
	}
	return false;
}

const navi = document.createElement('div');
navi.id = "medium-ready-container";
navi.style.display = "block";
navi.style.padding = '10px';
navi.style.position = 'fixed';
navi.style.top = '120px';
navi.style.right = '0px';
navi.style.backgroundColor = 'rgba(235, 235, 235, 1.0)';
navi.style.borderRadius = '0 0 0 5px';
navi.style.maxHeight = '600px';
navi.style.maxWidth = '360px';
navi.style.overflow = 'auto';

headers.forEach((h) => {
	if(h.innerHTML && h.innerHTML.length !== 0 && h.innerHTML.length < 40 && !hasBlockedWord(h.innerHTML, blockedWords)) {
		let hDiv = document.createElement('div');
		hDiv.textContent = h.innerHTML;
		if(h.tagName === "H1") {
			hDiv.classList.add("item-h1");
			hDiv.style.fontWeight = "800";
			hDiv.style.fontSize = "22px";
			hDiv.style.cursor = "pointer";
			hDiv.style.margin = "5px";
		} else if(h.tagName === "H2") {
			hDiv.classList.add("item-h2");
			hDiv.style.fontWeight = "600";
			hDiv.style.fontSize = "17px";
			hDiv.style.cursor = "pointer";
			hDiv.style.margin = "3px";
			hDiv.style.marginLeft = "20px";
		} else if(h.tagName === "H3") {
			hDiv.classList.add("item-h1");
			hDiv.style.fontSize = "16px";
			hDiv.style.cursor = "pointer";
			hDiv.style.margin = "2px";
			hDiv.style.marginLeft = "35px";
		} else if(h.tagName === "H4") {
			hDiv.classList.add("item-h2");
			hDiv.style.fontSize = "15px";
			hDiv.style.cursor = "pointer";
			hDiv.style.marginLeft = "40px";
		}
		hDiv.addEventListener("click", function() {
			// h.scrollIntoView({
			// 	behavior: "smooth"
			// });
			const offset = 120;
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



