// ==UserScript==
// @name		BetterOnlineClass
// @namespace	https://github.com/green1052
// @version		1.0.0
// @homepageURL	https://github.com/green1052/BetterOnlineClass
// @downloadURL https://raw.githubusercontent.com/green1052/BetterOnlineClass/main/BetterOnlineClass.user.js
// @author		green1052
// @description	온라인 클래스 강의 창을 여러 개 띄울 수 있게 해줍니다.
// @include     oc40.ebssw.kr/*/hmpg/hmpgLctrumView.do?
// @run-at		document-end
// ==/UserScript==

(function () {
    "use strict";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = function betterShowNewLrnWindow(lctreSn, sttusCode, openDateYn, lctreSeCode, dt) {
        if (!fncIsEmpty(lctreSn)) {
            if (sttusCode != '005' || dt != '' && openDateYn != '1') {
                if (sttusCode == '005' && openDateYn == '0') alert(dt + " 오픈예정 입니다.");
                else alert("오픈준비중 입니다.");
                return;
            }
        }

        if (!isHmpgMber) {
            alert('클래스 가입후 이용해주세요.');
            return;
        }

        if (lctreSeCode == 'EVL') {
            if ($("#evlBeginYn").val() == 1) {
                alert("시험일에 응시가 가능합니다.\n아래 시험일시를 확인해 주세요.\n\n* 시험일시\n - " + $("#evlBeginDt").val());

            } else if ($("#evlEndYn").val() == 1) {
                alert("시험 기간이 종료 되었습니다.");

            } else if ($("#rspnsManageSn").val() != 0) {
                alert("이미 응시완료된 시험입니다.");

            } else if ($("#evlBeginYn").val() == 0 && $("#evlEndYn").val() == 0) {
                if (confirm("시험 응시가 가능합니다.\n시험을 위한 학습창이 열리면 시험이 시작됩니다.\n\n시험 중 학습창을 닫거나 시험을 포기할 경우\n평가에 불이익이 있을 수 있습니다.")) {
                    var atnlcNo = $("#atnlcNo").val();
                    var stepSn = $("#stepSn").val();
                    var sessSn = $("#sessSn").val();

                    var url = "";
                    url += "/mypage/userlrn/userLrnView.do";
                    url += "?";
                    url += "atnlcNo=" + atnlcNo;
                    url += "&";
                    url += "stepSn=" + stepSn;

                    if (!fncIsEmpty(sessSn)) {
                        url += "&";
                        url += "sessSn=" + sessSn;
                    }

                    if (!fncIsEmpty(lctreSn)) {
                        url += "&";
                        url += "lctreSn=" + lctreSn;
                    }

                    url += "&onlineClassYn=Y";

                    window.open(url);
                }
            }
        } else {
            var atnlcNo = $("#atnlcNo").val();
            var stepSn = $("#stepSn").val();
            var sessSn = $("#sessSn").val();

            var url = "";
            url += "/mypage/userlrn/userLrnView.do";
            url += "?";
            url += "atnlcNo=" + atnlcNo;
            url += "&";
            url += "stepSn=" + stepSn;

            if (!fncIsEmpty(sessSn)) {
                url += "&";
                url += "sessSn=" + sessSn;
            }

            if (!fncIsEmpty(lctreSn)) {
                url += "&";
                url += "lctreSn=" + lctreSn;
            }

            url += "&onlineClassYn=Y";

            window.open(url);
        }
    };

    document.head.appendChild(script);

    setTimeout(function () {
        document.querySelectorAll("li.clearfix div.class_tit").forEach(query => {
            const attribute = query.getElementsByTagName("a")[0].attributes[0].value;

            query.getElementsByTagName("a")[0].attributes[0].value = attribute.replace("showNewLrnWindow", "betterShowNewLrnWindow");
        });
    }, 1000);
})();
