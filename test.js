var inputName = document.getElementById("fullname");
var inputResult = document.getElementById("result");
var inputAddress = document.querySelectorAll(".vanphu--input");

var textOld = "";
var address = "";

inputName.onkeyup = function () {
    var text = inputName.value;
    var tiengVietKhongDau = bodauTiengViet(text);
    var uperCaseText = titleCase(text);

    inputResult.value = tiengVietKhongDau + " ( " + uperCaseText + " )" + address;
    textOld = tiengVietKhongDau + " ( " + uperCaseText + " )";
}

function resultAddMore() {
    var inputMoreAdress = document.getElementById("more");
    inputResult.value = textOld + "- " + titleCase(inputMoreAdress.value);
}

function changeHandler() {
    address = "";
    for (var i = 0; i < inputAddress.length; i++) {
        if (inputAddress[i].checked === true) {
            address = "- " + inputAddress[i].value;
            inputResult.value = textOld + address;
        }
    }
}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

function bodauTiengViet(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    // str = str.replace(/\W+/g, ' ');
    // str = str.replace(/\s/g, '-');
    return str;
}

function cancel() {
    // inputName.value = "";
    // inputAddress.value = "";
    // inputResult.value = "";

    // for (var i = 0; i < inputAddress.length; i++) {
    //     inputAddress[i].checked = false;
    // }
    window.location.href = "test.html";
}

function copy() {
    if (inputResult.value == "") {
        showErrorToast()
        return;
    }
    inputResult.select();
    inputResult.setSelectionRange(0, 99999);
    document.execCommand('copy');

    var btnCopy = document.getElementById("btnCopy");
    btnCopy.value = "Quay lại";
    btnCopy.style.backgroundColor = "rgba(27,160,147,0.28)";
    btnCopy.style.color = "#1ba093";

    showSuccessToast();

    btnCopy.onclick = function () {
        // createNamePage();
        window.location.href = "https://saolamvanphunhoquanninhbinh.kiotviet.vn/sale/#/";
    }

}

function showSuccessToast() {
    toast({
        title: "Đã sao chép!",
        message: "Bạn đã đăng ký thành công tài khoản tại F8.",
        type: "success",
        duration: 3000
    });
}

function showErrorToast() {
    toast({
        title: "Sao chép thất bại!",
        message: "Có lỗi xảy ra, vui lòng liên hệ quản trị viên.",
        type: "error",
        duration: 5000
    });
}

// Toast function
function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
        const toast = document.createElement("div");

        // Auto remove toast
        const autoRemoveId = setTimeout(function () {
            main.removeChild(toast);
        }, duration + 1000);

        // Remove toast when clicked
        toast.onclick = function (e) {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };

        const icons = {
            success: "fas fa-check-circle",
            info: "fas fa-info-circle",
            warning: "fas fa-exclamation-circle",
            error: "fas fa-exclamation-circle"
        };
        const icon = icons[type];
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          
                      </div>
                      <div class="toast__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
        main.appendChild(toast);
    }
}