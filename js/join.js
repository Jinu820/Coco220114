$('form').on('submit',function(){

    // ^[] : 첫문자 일치  []$ : 끝문자 일치
    // [a-zA-Z] : 영문자 걸러내기  [0-9] : 숫자만 걸러내기
    // 숫자(3~4) : \d{3,4}, 숫자 : \d{4} 
    // [^a-zA-Z0-9]
    // . : 임의의 모든 문자 (숫자,영문자,특수문자)
    // + : 한번이상나옴  * : 0번이상 나옴(안나올수도있다~)
    // ?= : 조건확인후 처음으로 돌아감
    // 정규표현식.test(변수) : 변수값이 정규표현식에 맞으면 true 틀리면 false값을 돌려주는 메소드

    // 아이디는 특수문자는 포함하지 않으며,영문자와 숫자만 허용하고 6글자 이상
    var idval = $('#idbox').val()

    var idcheck = /^[a-zA-Z0-9]+$/


    if (!idcheck.test(idval) || idval.length<6) {
        alert('아이디는 영어,숫자로만 입력하세요.(6글자 이상)')
        $('#idbox').focus()
        return false
    }
    
    // 비밀번호는 영문,숫자,특수문자 중 3가지 이상 조합. 첫글자는 영어만 허용
    var passvalcheck = /^(?=[a-zA-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).*$/
    var passval = $('#pwbox').val()
    var passvalok = $('#pwboxok').val()
    if (!passvalcheck.test(passval)){
        alert('비밀번호는 영문,숫자,특수문자중 3가지 이상 조합하며,첫글자를 영문자여야 한다.')
        $('#pwbox').focus()
    } else {
        if (passvalok) {
            if (passval!==passvalok) {
                alert('비밀번호가 맞지 않습니다.')
                $('pwbox').focus()
                return false
            }
        } else {
            alert('비밀번호확인을 입력해 주세요.')
            $('#pwboxok').focus()
            return false
        }
    }
    var irumval = $('#irum').val()
    var irumvalcheck=/^[가-힣]+$/
    if (!irumvalcheck.test(irumval)){
        alert('이름은 한글만 입력해 주세요.')
        $('irum').focus()
        return false
    }

    // 휴대폰 번호 가운데 숫자는 3~4자리
    // 휴대폰 번호 마지막 번호는 4자리
    var hp1val = $('#hp1').val()
    var hp2val = $('#hp2').val()
    var hp1valcheck = /^\d{3,4}$/
    var hp2valcheck = /^\d{4}$/

    if(!hp1valcheck.test(hp1val)) {
        alert('번호를 다시 입력해주세요.')
        $('#hp1').focus()
        return false
    }
    if(!hp2valcheck.test(hp2val)) {
        alert('번호를 다시 입력해주세요.')
        $('#hp2').focus()
        return false
    }

    var emailval = $('#emaildomain').val()
    var emailvalcheck = /^[a-zA-Z]+[\.][a-z]+([\.][a-z]+)*$/
    if (!emailvalcheck.test(emailval)) {
        alert('이메일 형식이 올바르지 않습니다.')
        $('#emaildomain').focus()
        return false
    }

    if ( !$('#male').prop('checked') && !$('#female').prop('checked')) {
        $('male').focus()
        alert('성별을 선택해 주세요')
        return false
    }




    return false // 프로그램이 완성되면 삭제할 것
})

// 이메일주소 입력상자에서 선택상자의 옵션을 변경했을때
// 선택된 option의 value값을 추출해서            :val()
// value값이 noselect가 아니고, self가 아닌 경우
// #emaildomain 입력상자 value값을 쓰고, 비활성화 :val('쓸내용')
// value값이 self(직접입력)인 경우에는 disabled를 false로 바꿔서 입력상자 활성화
// value값이 noselect인 경우에는 비활성화
$('#domainlist').on('change',function(){
    var value = $(this).find('option:selected').val()
    if (value!=='noselect' && value!=='self'){
        $('#emaildomain').val(value).attr({disabled:true})
    } else if (value==='self') {
        $('#emaildomain').attr({disabled:false}).val("")
    } else {
        $('#emaildomain').attr({disabled:true}).val("")
    }
})

// 체크박스들을 전체선택으로 제어하기
$('.joinBox #all').on('click',function(){
    var check = $(this).prop('checked')
    // $('input[id^="co"]').prop({checked:check})
    $(this).siblings().prop({checked:check})
})

//메모박스에 글씨 입력할때마다 남은 글자수 계산하긩
var maxleng = 10
$('.joinBox #memo').on('keyup',function(){
    var currleng = $(this).val().length
    var remainleng = maxleng-currleng
    if (remainleng===-1) {remainleng=0}
    $(this).next().text(remainleng);
})