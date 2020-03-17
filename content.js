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

console.log(GetElementsByExactClassName("n p")); // 这个fn 返回的一定是个nodeList, 我们只需要里面的2 -> len - 3的nodes,其余不需要
const extractedClassElements = GetElementsByExactClassName("n p");
const len = extractedClassElements.length;
const contentList = extractedClassElements.slice(1, len - 3);
// const content = document.createElement("div");
// nodeList.forEach((node) => content.appendChild(node.cloneNode(true)));

// const content = extractedClassElements[2].innerHTML.length > extractedClassElements[3].innerHTML.length ? extractedClassElements[2] : extractedClassElements[3];

// const loginNotPay = document.getElementsByClassName("n p")[6].innerHTML.length > document.getElementsByClassName("n p")[7].innerHTML.length ? document.getElementsByClassName("n p")[6] : document.getElementsByClassName("n p")[7];
// const content = document.getElementsByClassName("n p")[3].innerHTML.length > loginNotPay.innerHTML.length ? document.getElementsByClassName("n p")[3] : loginNotPay;
// const winner = document.getElementsByClassName("n p")[2].innerHTML.length > content.innerHTML.length ? document.getElementsByClassName("n p")[3].innerHTML : content;

// const headers = content.querySelectorAll("h1,h2,h3,h4");

// console.log(document.getElementsByClassName("n p"));

const blockedWords = [
	"</a>",
	"</button>",
	"</span>",	
	"<!-- -->",
	"Explore your membership",
	"</div>",
];

const hasBlockedWord = (str, blockedWords) => {
	for(let word of blockedWords) {
		if(str.includes(word)) {
			return true;
		}
	}
	return false;
}

// const takeOffStrong = (word) => {
// 	if(word.includes("<strong")) {
//   	let l = word.indexOf('>');
//     let r = word.indexOf("</strong");
//   	return word.substring(l + 1, r);
//   }
//   return word;
// }
const takeOffStrong = (word) => {
	if(word.includes("<strong")) {
  	let f = word.indexOf('<strong');
  	let l = word.indexOf('>');
    let r = word.indexOf("</strong>");
  	return takeOffStrong(word.substring(0, f)) + word.substring(l + 1, r) +takeOffStrong(word.substring(r + 9));
  }
  return word;
}

const takeOffEm = (word) => {
	if(word.includes("<em")) {
  	let f = word.indexOf('<em');
  	let l = word.indexOf('>');
    let r = word.indexOf("</em>");
  	return word.substring(0, f) + word.substring(l + 1, r) + word.substring(r + 5);
  }
  return word;
}

const navi = document.createElement('div');
navi.id = "medium-ready-container";
navi.style.display = "block";
navi.style.padding = '15px 12px';
navi.style.position = 'fixed';
navi.style.top = '120px';
navi.style.right = '0px';
navi.style.color = 'white';
navi.style.backgroundColor = 'rgba(10, 10, 10, 0.75)';
navi.style.borderRadius = '0 0 0 5px';
navi.style.maxHeight = '600px';
navi.style.maxWidth = '360px';
navi.style.overflow = 'auto';
	
contentList.forEach(content => {
	const headers = content.querySelectorAll("h1,h2,h3,h4");
	headers.forEach((h) => {
		if(h.innerHTML && h.innerHTML.length !== 0 && !hasBlockedWord(h.innerHTML, blockedWords)) {
			let hDiv = document.createElement('div');
			hDiv.textContent = takeOffEm(takeOffStrong(h.innerHTML));
			hDiv.classList.add("my-item");
			if(h.tagName === "H1") {
				hDiv.classList.add("item-h1");
				hDiv.style.fontWeight = "800";
				hDiv.style.fontSize = "20px";
				hDiv.style.lineHeight = "20px";
				hDiv.style.cursor = "pointer";
				hDiv.style.margin = "8px";
				hDiv.style.marginTop = "12px";
			} else if(h.tagName === "H2") {
				hDiv.classList.add("item-h2");
				hDiv.style.fontWeight = "600";
				hDiv.style.fontSize = "17px";
				hDiv.style.cursor = "pointer";
				hDiv.style.margin = "4px";
				hDiv.style.marginTop = "7px";
				hDiv.style.marginLeft = "24px";
			} else if(h.tagName === "H3") {
				hDiv.classList.add("item-h1");
				hDiv.style.fontSize = "16px";
				hDiv.style.cursor = "pointer";
				hDiv.style.margin = "2px";
				hDiv.style.marginLeft = "39px";
			} else if(h.tagName === "H4") {
				hDiv.classList.add("item-h2");
				hDiv.style.fontSize = "15px";
				hDiv.style.cursor = "pointer";
				hDiv.style.marginLeft = "44px";
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
})

const toggle = document.createElement('div');
toggle.id = "medium-ready-toggle";
toggle.style.display = "block";
toggle.style.position = 'fixed';
toggle.style.top = '120px';
toggle.style.right = '360px';
toggle.style.width = "40px";
toggle.style.height = "70px";
toggle.style.borderRadius = "10px 0 0 10px";
toggle.style.color = "white";
toggle.style.padding = "10px";
toggle.style.paddingLeft = "15px";
toggle.style.paddingTop = "25px";
toggle.style.textAlign = "center";
toggle.style.cursor = "pointer";
toggle.style.backgroundColor = 'rgba(10, 10, 10, 0.75)';
toggle.innerText = "M";
document.body.appendChild(toggle);

toggle.addEventListener("click", function() {;
	if(navi.style.display == "none") {
		navi.style.display = "block";
		toggle.style.right = '360px';
	} else {
		navi.style.display = "none";
		toggle.style.right = "0px";
	}
});

// headers.forEach((h) => {
// 	if(h.innerHTML && h.innerHTML.length !== 0 && takeOffStrong(h.innerHTML).length < 65 && !hasBlockedWord(h.innerHTML, blockedWords)) {
// 		let hDiv = document.createElement('div');
// 		hDiv.textContent = takeOffStrong(h.innerHTML);
// 		hDiv.classList.add("my-item");
// 		if(h.tagName === "H1") {
// 			hDiv.classList.add("item-h1");
// 			hDiv.style.fontWeight = "800";
// 			hDiv.style.fontSize = "22px";
// 			hDiv.style.lineHeight = "20px";
// 			hDiv.style.cursor = "pointer";
// 			hDiv.style.margin = "8px";
// 		} else if(h.tagName === "H2") {
// 			hDiv.classList.add("item-h2");
// 			hDiv.style.fontWeight = "600";
// 			hDiv.style.fontSize = "17px";
// 			hDiv.style.cursor = "pointer";
// 			hDiv.style.margin = "3px";
// 			hDiv.style.marginLeft = "20px";
// 		} else if(h.tagName === "H3") {
// 			hDiv.classList.add("item-h1");
// 			hDiv.style.fontSize = "16px";
// 			hDiv.style.cursor = "pointer";
// 			hDiv.style.margin = "2px";
// 			hDiv.style.marginLeft = "35px";
// 		} else if(h.tagName === "H4") {
// 			hDiv.classList.add("item-h2");
// 			hDiv.style.fontSize = "15px";
// 			hDiv.style.cursor = "pointer";
// 			hDiv.style.marginLeft = "40px";
// 		}
// 		hDiv.addEventListener("click", function() {
// 			// h.scrollIntoView({
// 			// 	behavior: "smooth"
// 			// });
// 			const offset = 120;
// 			const bodyRect = document.body.getBoundingClientRect().top;
// 			const elementRect = h.getBoundingClientRect().top;
// 			const elementPosition = elementRect - bodyRect;
// 			let offsetPosition = elementPosition - offset;
// 			window.scrollTo({
// 				top: offsetPosition,
// 				behavior: "smooth"
// 			})
// 		});
// 		navi.append(hDiv);
// 	}
// });

// document.body.appendChild(navi);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.data === "open") {
		navi.style.display = "block";
		toggle.style.display = "block";
		document.body.appendChild(navi);
		document.body.appendChild(toggle);
	} else if(request.data === "close") {
		navi.style.display = "none";
		toggle.style.display = "none";
	}
});

chrome.storage.sync.get('isOpen', function(data) {
	if(data.isOpen) {
		navi.style.display = "block";
		toggle.style.display = "block";
		document.body.appendChild(navi);
		document.body.appendChild(toggle);
	} else {
		navi.style.display = "none";
		toggle.style.display = "none";
		document.body.removeChild(navi);
		document.body.removeChild(toggle);
	}
});



