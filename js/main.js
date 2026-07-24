"use strict";

// カスタムカーソル
$(function () {
  // カーソル要素を取得
  const cursor = $("#cursor");

  // マウスに合わせてカーソルを移動
  $(document).on("mousemove", function (e) {
    cursor.css({
      opacity: 1,
      top: `${e.clientY}px`,
      left: `${e.clientX}px`,
    });
  });

  // リンク・ボタンに重なったら拡大
  $(document).on("mouseenter", "a, button", function () {
    cursor.addClass("is-hover");
  });

  // 離れたら元の大きさに戻す
  $(document).on("mouseleave", "a, button", function () {
    cursor.removeClass("is-hover");
  });
});


//ハンバーガーメニュー
$(function () {
  $(".hamburger").click(function () {
    $(".hamburger").toggleClass("open");
    $(".header__nav-sp").fadeToggle();
  });

  //メニュー内のリンクをタップしたら閉じる
  $(".header__nav-sp a").click(function () {
    $(".hamburger").removeClass("open");
    $(".header__nav-sp").fadeOut();
  });
});


//slick
$(function () {
  $(".works__slider02").slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
  });
});


// アーチのアニメーション
const archWraps = document.querySelectorAll(
  ".arch-wrap, .heading-arch, .heading-arch__banner"
);

const archObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // 画面内に入ったらアニメーションを開始
      if (entry.isIntersecting) {
        entry.target.classList.add("is-animate");
        archObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.8,
  }
);

// 対象要素を監視
archWraps.forEach((wrap) => archObserver.observe(wrap));



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


// 別ページからハッシュ付きで移動したとき、読み込み後に位置を調整
window.addEventListener("load", function () {
  if (location.hash) {
    const target = document.querySelector(location.hash);

    if (target) {
      // ヘッダーの高さを取得
      const header = document.querySelector("#header");
      const headerHeight = header ? header.offsetHeight : 0;

      // スムーススクロールを一時的に無効化
      const html = document.documentElement;
      const prevBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";

      // ヘッダーに隠れない位置まで移動
      const targetPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight -
        20;

      window.scrollTo(0, targetPosition);

      // スクロール設定を元に戻す
      html.style.scrollBehavior = prevBehavior;
    }
  }
});
