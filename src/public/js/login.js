function handleLoginBtn(){
    $("#loginBtn").on("click", function(event) {
        event.preventDefault();
        let email = $("#email").val();
        let password = $("#password").val();

        $.ajax({
            url: `${window.location.origin}/login`,
            method: "POST",
            data: {email: email, password: password},   // key : value
            success: function(data) {
                window.location.href = "/";
            },
            error: function(err) {
                alert("당신의 이메일 또는 비밀번호가 틀렸습니다. 다시 시도하세요!");
            }
        })
    });
}
$(document).ready(function() {
    handleLoginBtn();
});