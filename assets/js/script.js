let inputText = document.getElementById("input_text");
let outputText = document.getElementById("output_text");
let outputTextBox = document.getElementById("output_text_box");
let outputImageBox = document.getElementById("output_image_box");
let encryptButton = document.getElementById("encrypt_button");
let desencryptButton = document.getElementById("desencrypt_button");
let clipboardCopyButton = document.getElementById("clipboard_copy_button");

let cryptoDictionary = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

function verifyLowerCase(text) {
  return text.match(/^[A-Zàèéòùïêèçäëïöü]+$/) ? false : true;
  // return text.match(/^[a-z ]*$/) ? true : false;
}

/**
 * It takes a string and a dictionary as arguments, and returns a string where each
 * character in the original string is replaced by the value of the key in the
 * dictionary that matches the character.
 */
function encrypt(text, cryptoDictionary) {
  let encryptedText = "";

  for (let iLetter = 0; iLetter < text.length; iLetter++) {
    encryptedText += cryptoDictionary[text[iLetter]]
      ? cryptoDictionary[text[iLetter]]
      : text[iLetter];
  }

  return encryptedText;
}

/**
 * It replaces the encrypted letters with the original letters
 */
function desencrypt(encryptedText, cryptoDictionary) {
  let desencryptedText = encryptedText;

  for (let key in cryptoDictionary) {
    desencryptedText = desencryptedText.replaceAll(cryptoDictionary[key], key);
  }

  return desencryptedText;
}

function setIfIsValid(text) {
  let errorMessage =
    "Entrada invalida, por favor escriba un texto en minúsculas y sin acentos.";

  outputTextBox.style.display = text.trim() == "" ? "none" : "flex";
  outputImageBox.style.display = text.trim() == "" ? "block" : "none";

  outputText.value = verifyLowerCase(text) ? text : errorMessage;
}

encryptButton.onclick = () => {
  setIfIsValid(encrypt(inputText.value, cryptoDictionary));
};

desencryptButton.onclick = () => {
  setIfIsValid(desencrypt(inputText.value, cryptoDictionary));
};

/* Copying the text in the output text box to the clipboard. */
clipboardCopyButton.onclick = () => {
  navigator.clipboard.writeText(outputText.value);
};
