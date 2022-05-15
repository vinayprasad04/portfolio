    function onDayNightModeClick() {
        if (localStorage.getItem('screenModeNightTokenState') == 'night'){
            localStorage.setItem('screenModeNightTokenState', 'day');
            document.body.classList.remove("darkMode");
        } else  {
            localStorage.setItem('screenModeNightTokenState', 'night');
              document.body.classList.add("darkMode");
        }
        //return document.body.classList.toggle("darkMode");
    }
    document.addEventListener('load', function(event) {
        if (localStorage.getItem('screenModeNightTokenState') == 'night'){
            document.body.classList.add("darkMode");
        }
    },true);

    function onSettingClick(e) {
        setTimeout(()=>{
            e.parentNode.classList.toggle("animation");
        },10)
        e.parentNode.classList.toggle("open");

    }

    function setColorTheme(color) {
        let files = document.querySelectorAll(".colorThemeFile");
        files.forEach((style)=>{
            if(color === style.getAttribute("title")){
                style.removeAttribute("disabled");
            }else{
                style.setAttribute("disabled","true");
            }
        })
    }


    function onClickMenu(e) {
        return document.body.classList.toggle("leftMenuOpen");
    }

    function removePopup() {
        return document.body.classList.remove("leftMenuOpen");
    }
/*
        let ignoreClickOnMeElement = document.querySelector('header');
        document.addEventListener('click', function(event) {
            if(document.body.classList.contains("leftMenuOpen")){
                let isClickInsideElement = ignoreClickOnMeElement.contains(event.target);
                if (!isClickInsideElement) {
                    let link = document.body;
                    link.classList.add("leftMenuOpen");
                    //document.body.classList.remove("leftMenuOpen");
                }
            } else{
                console.log("outside click")
            }
        });
*/

