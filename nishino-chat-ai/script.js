// script.js - 最新生物学研究トピックスのインタラクティブ機能

document.addEventListener('DOMContentLoaded', function() {
    /**
     * 詳細表示ボタンのイベントリスナー設定
     * 各トピックの「詳細を表示」ボタンがクリックされたときの動作を制御する
     */
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 対応する展開コンテンツを取得
            const expandedContent = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // 表示状態を切り替え
            if (expandedContent.style.display === 'block') {
                // 閉じる処理
                expandedContent.style.display = 'none';
                this.innerHTML = '詳細を表示 <i class="fas fa-chevron-down"></i>';
            } else {
                // 開く処理
                expandedContent.style.display = 'block';
                this.innerHTML = '詳細を閉じる <i class="fas fa-chevron-up"></i>';
                
                // スムーズスクロール
                expandedContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /**
     * ニュースレター登録フォームの送信処理
     * フォーム送信時にバリデーションと送信成功メッセージを表示する
     */
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // メールアドレス取得＆簡易バリデーション
            const emailInput = document.getElementById('email');
            const email = emailInput.value.trim();
            
            // メールアドレスの簡易検証（実際の実装ではより厳密な検証が必要）
            if (email && email.includes('@') && email.includes('.')) {
                // 成功メッセージ（実際はサーバーへのAPIリクエストが必要）
                alert('ニュースレターに登録しました！（デモのため実際には登録されていません）');
                emailInput.value = '';
            } else {
                alert('有効なメールアドレスを入力してください。');
            }
        });
    }

    /**
     * ナビゲーションのスムーズスクロール実装
     * 各ナビゲーションリンクがクリックされたときにスムーズにスクロールする
     */
    const navLinks = document.querySelectorAll('nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // リンクが同じページ内の要素を指す場合（#で始まるもの）
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // ヘッダーの高さを考慮したスクロール位置の調整
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /**
     * スクロール時のナビゲーションバーのスタイル変更
     * スクロール位置に応じてナビゲーションバーの見た目を変更する
     */
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.background = 'rgba(39, 174, 96, 0.95)';
        } else {
            navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
            navbar.style.background = 'var(--secondary-color)';
        }
    });

    /**
     * 画像の遅延読み込み実装
     * ページロード時のパフォーマンス向上のため、画像を遅延読み込みする
     */
    const lazyLoadImages = function() {
        const images = document.querySelectorAll('.image-container img');
        
        // IntersectionObserverがサポートされている場合
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('src');
                        
                        // プレースホルダー画像の場合、実際の画像に置き換える想定
                        // （実際の実装では、data-src属性などに実際の画像URLを設定する）
                        if (src.includes('placeholder')) {
                            // ここで実際の画像URLに置き換える処理を行う
                            // 今回はデモのため処理を省略
                        }
                        
                        // 監視を解除
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => {
                imageObserver.observe(img);
            });
        }
    };
    
    // 遅延読み込みを実行
    lazyLoadImages();
});