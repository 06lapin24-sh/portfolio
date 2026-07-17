"use strict";

//カーソルの見た目を変える
$(function(){
  
  //カーソル要素の指定
  var cursor=$("#cursor");
  
  //mousemoveイベントでカーソル要素を移動させる
  $(document).on("mousemove",function(e){
    //カーソルの座標位置を取得
    var x=e.clientX;
    var y=e.clientY;
    //カーソル要素のcssを書き換える用
    cursor.css({
      "opacity":"1",
      "top":y+"px",
      "left":x+"px"
    });
  });
});

$(function () {
  var cursor = $("#cursor");

  // 大きくしたい要素をまとめて指定
  var hoverTargets = "a, button, .link, .btn__primary, .btn__secondary";

  $(document).on("mouseenter", hoverTargets, function () {
    cursor.addClass("is-hover");
  });

  $(document).on("mouseleave", hoverTargets, function () {
    cursor.removeClass("is-hover");
  });
});


// アコーディオンボタンを全て取得
const accordionBtns = document.querySelectorAll(".accordion__btn");

// SP幅(768px以下)かどうかを判定
const mq = window.matchMedia("(max-width: 768px)");

function handleClick(e) {
  // PC幅では動作させない
  if (!mq.matches) return;

  const btn = e.currentTarget;
  const content = btn.nextElementSibling;
  const isOpen = btn.classList.contains("is-open");

  // 一旦全て閉じる(排他制御)
  accordionBtns.forEach((otherBtn) => {
    const otherContent = otherBtn.nextElementSibling;
    otherContent.style.maxHeight = null;
    otherBtn.classList.remove("is-open");
  });

  // 閉じていたものだけ開く
  if (!isOpen) {
    content.style.maxHeight = content.scrollHeight + "px";
    btn.classList.add("is-open");
  }
}

// 各ボタンにクリックイベントを設定
accordionBtns.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});

// PC⇔SP切り替え時に開閉状態をリセット
mq.addEventListener("change", () => {
  accordionBtns.forEach((btn) => {
    btn.classList.remove("is-open");
    btn.nextElementSibling.style.maxHeight = "";
  });
});


// 別ページからハッシュ付きで遷移してきた場合、画像読込完了後に位置を再調整
window.addEventListener("load", function () {
  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) {
      const header = document.querySelector("#header");
      const headerHeight = header ? header.offsetHeight : 0;

      // 一瞬 scroll-behavior を無効化して、ズレをリセット
      const html = document.documentElement;
      const prevBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";

      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

      window.scrollTo(0, targetPosition);

      // 元に戻す
      html.style.scrollBehavior = prevBehavior;
    }
  }
});


//about.html アーチのアニメーション
const archWraps = document.querySelectorAll(
  ".arch-wrap, .heading-arch, .heading-arch__banner" 
);

const archObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-animate");
        archObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.8 }
);

archWraps.forEach((wrap) => archObserver.observe(wrap));