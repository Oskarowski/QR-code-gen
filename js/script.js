const form = document.getElementById("generate-form");
const qrCode = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
  e.preventDefault();
  clearUI();
  const url = document.getElementById("url-input").value;
  const size = document.getElementById("size-input").value;

  if (url === "") {
    //TODO add custom alert
    alert("Please enter a URL");
    return;
  }
  setTimeout(() => {
    hideSpinner();
    generateQRCode(url, size);

    setTimeout(() => {
      const saveUrl = qrCode.querySelector("img").src;
      createDownloadLink(saveUrl);
    }, 50);
  }, 1000);
  showSpinner();
};

const clearUI = () => {
  qrCode.innerHTML = "";
  const downloadLink = document.getElementById("download-link");
  if (downloadLink) {
    downloadLink.remove();
  }
};

const generateQRCode = (url, size) => {
  const qeCode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

const showSpinner = () => {
  const spinner = document.getElementById("gear-spinner-box");
  if (spinner) {
    spinner.style.display = "block";
  }
};

const hideSpinner = () => {
  const spinner = document.getElementById("gear-spinner-box");
  if (spinner) {
    spinner.style.display = "none";
  }
};

const createDownloadLink = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "download-link";
  link.href = saveUrl;
  link.download = qrCode;
  link.innerHTML = "Download QR Code";
  link.classList.add("btn", "btn-success", "btn-block", "mt-4");
  document.getElementById("qrcode").appendChild(link);
};

form.addEventListener("submit", onGenerateSubmit);
