
const selectTag = document.querySelectorAll(".select-country"),
fromInput = document.querySelector('#from-text'),
translateBtn = document.querySelector(".translate-btn"),
toInput = document.querySelector('#to-text'),
icons = document.querySelectorAll('.icons i'),
exChange = document.querySelector('.fa-exchange-alt'),
QrImg = document.querySelector(".qr-code img"),
QrDiv = document.querySelector(".qr-code");

selectTag.forEach((tag,id) =>{
  for (const country_id in countries) {
    let selected;
    if(id == 0 && country_id == "en-GB"){
      selected = "selected";
    }else if(id == 1 && country_id == "ne-NP"){
      selected = "selected";
    }
    var option = `<option value="${country_id}"${selected}>${countries[country_id]}</option>`;
    tag.insertAdjacentHTML("beforeend",option);
  }
});
translateBtn.addEventListener("click" , () =>{
  var text = fromInput.value,
  translateFrom = selectTag[0].value,
  translateTo = selectTag[1].value;
  if(!text) return;
  toInput.setAttribute("placeholder","Translating..");
  translateBtn.textContent = "please wait..";
  var translateApi = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
  fetch(translateApi).then(res =>res.json()).then(data=>{
    toInput.value = data.responseData.translatedText;
    toInput.setAttribute("placeholder","Translation");
    translateBtn.textContent = "Translate Text";
  });
});

icons.forEach(icon=>{
  icon.addEventListener("click",({target})=>{
    if(target.classList.contains('fa-copy')){
        navigator.clipboard.writeText(toInput.value);
    }
    if(target.classList.contains('fa-qrcode')){
      QrDiv.classList.toggle("active");
      var qrText = toInput.value;
      if(!qrText) return;
      QrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${qrText}`;
      if(!QrImg.src){
        return;
      }else{
      
      }
    }
    if(target.classList.contains('fa-volume-up')){
      var speech;
     if(target.id == 'left-sound'){
      speech = new SpeechSynthesisUtterance(fromInput.value);
      speech.lang = selectTag[0].value;
     } else{
      speech = new SpeechSynthesisUtterance(toInput.value);
      speech.lang = selectTag[1].value;
     }
     speechSynthesis.speak(speech);
    }
    if(target.classList.contains("fa-paste")){
      navigator.clipboard.readText().then((clipText) => (fromInput.value += clipText)
  );
    }
  });
});
exChange.addEventListener('click',()=>{
  var Ttext = fromInput.value;
  fromInput.value = toInput.value;
  toInput.value = Ttext;
  var tLang = selectTag[0].value;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tLang;
});

     var mytext = fromInput;
      var result = document.querySelector("#count");
      result.textContent = 0;
      mytext.addEventListener('input',function(){
          var textlength = mytext.value.length;
          result.textContent = textlength;
          if(textlength > 500){
            result.textContent = "sorry";
          }
      });