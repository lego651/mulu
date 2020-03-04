const headID = document.getElementsByTagName('head')[0];
let link = document.createElement('link');
link.type = 'text/css';
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css?family=Lato:400,700,900&display=swap';
headID.appendChild(link);


function GetElementsByExactClassName(someclass) {
  var i, length, elementlist, data = [];

  // Get the list from the browser
  elementlist = document.getElementsByClassName(someclass);
  if (!elementlist || !(length = elementlist.length))
    return [];

  // Limit by elements with that specific class name only
  for (i = 0; i < length; i++) {
    if (elementlist[i].className == someclass)
      data.push(elementlist[i]);
  }

  // Return the result
  return data;
} 

console.log(GetElementsByExactClassName("n p"));
const extractedClassElements = GetElementsByExactClassName("n p");

const content = extractedClassElements[2].innerHTML.length > extractedClassElements[3].innerHTML.length ? extractedClassElements[2] : extractedClassElements[3];

// const loginNotPay = document.getElementsByClassName("n p")[6].innerHTML.length > document.getElementsByClassName("n p")[7].innerHTML.length ? document.getElementsByClassName("n p")[6] : document.getElementsByClassName("n p")[7];
// const content = document.getElementsByClassName("n p")[3].innerHTML.length > loginNotPay.innerHTML.length ? document.getElementsByClassName("n p")[3] : loginNotPay;
// const winner = document.getElementsByClassName("n p")[2].innerHTML.length > content.innerHTML.length ? document.getElementsByClassName("n p")[3].innerHTML : content;

const headers = content.querySelectorAll("h1,h2,h3,h4");

// console.log(document.getElementsByClassName("n p"));

const blockedWords = [
	"</a>",
	"</button>",
	"</span>",	
	"<!-- -->",
	"Explore your membership",
];

const hasBlockedWord = (str, blockedWords) => {
	for(let word of blockedWords) {
		if(str.includes(word)) {
			return true;
		}
	}
	return false;
}

const takeOffStrong = (word) => {
	if(word.includes("<strong")) {
  	let l = word.indexOf('>');
    let r = word.indexOf("</strong");
  	return word.substring(l + 1, r);
  }
  return word;
}

const navi = document.createElement('div');
navi.id = "medium-ready-container";
navi.style.display = "block";
navi.style.padding = '10px';
navi.style.position = 'fixed';
navi.style.top = '120px';
navi.style.right = '0px';
navi.style.color = 'white';
navi.style.backgroundColor = 'rgba(10, 10, 10, 0.6)';
navi.style.borderRadius = '0 0 0 5px';
navi.style.maxHeight = '600px';
navi.style.maxWidth = '360px';
navi.style.overflow = 'auto';

headers.forEach((h) => {
	if(h.innerHTML && h.innerHTML.length !== 0 && takeOffStrong(h.innerHTML).length < 65 && !hasBlockedWord(h.innerHTML, blockedWords)) {
		let hDiv = document.createElement('div');
		hDiv.textContent = takeOffStrong(h.innerHTML);
		hDiv.classList.add("my-item");
		if(h.tagName === "H1") {
			hDiv.classList.add("item-h1");
			hDiv.style.fontWeight = "600";
			hDiv.style.fontSize = "20px";
			hDiv.style.lineHeight = "20px";
			hDiv.style.cursor = "pointer";
			hDiv.style.margin = "10px";
		} else if(h.tagName === "H2") {
			hDiv.classList.add("item-h2");
			hDiv.style.fontWeight = "600";
			hDiv.style.fontSize = "16px";
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



