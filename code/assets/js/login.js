$(function() {
    $("#link_login").on("click", function() {
        $(".login-box").show();
        $(".reg-box").hide();
    });
    $("#link_reg").on("click", function() {
        $(".reg-box").show();
        $(".login-box").hide();
    });
});