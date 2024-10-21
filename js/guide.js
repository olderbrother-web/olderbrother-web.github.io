const guides = {
  'en': `
    <h2>Ordering Guide for International Customers</h2>
    <ol>
      <li>Choose your desired product from our Taobao store.</li>
      <li>Sign up for a shipping proxy service (e.g., Superbuy, WeGoBuy, or CSSBuy).</li>
      <li>Copy the Taobao product link and paste it into the proxy service's search bar.</li>
      <li>Select your size and any other options, then add the item to your cart.</li>
      <li>When ready, submit your order and pay for the items.</li>
      <li>Wait for the items to arrive at the proxy's warehouse.</li>
      <li>Once all items arrive, select them and submit a parcel for international shipping.</li>
      <li>Choose your preferred shipping method and pay for international shipping.</li>
      <li>Wait for your package to arrive and enjoy your new OLDER BROTHER products!</li>
    </ol>
  `,
  'zh': `
    <h2>国际客户订购指南</h2>
    <ol>
      <li>从我们的淘宝店选择您想要的产品。</li>
      <li>注册一个转运服务（例如，Superbuy，WeGoBuy 或 CSSBuy）。</li>
      <li>复制淘宝产品链接，并将其粘贴到转运服务的搜索栏中。</li>
      <li>选择您的尺码和其他选项，然后将商品添加到购物车。</li>
      <li>准备好后，提交订单并支付商品费用。</li>
      <li>等待商品到达转运仓库。</li>
      <li>所有商品到达后，选择它们并提交国际运输包裹。</li>
      <li>选择您喜欢的运输方式，并支付国际运费。</li>
      <li>等待您的包裹到达，享受您的新 OLDER BROTHER 产品！</li>
    </ol>
  `,
  'ja': `
    <h2>国際顧客向け注文ガイド</h2>
    <ol>
      <li>当社の淘宝（タオバオ）ストアから希望の商品を選びます。</li>
      <li>転送サービス（例：Superbuy、WeGoBuy、CSSBuy）に登録します。</li>
      <li>淘宝の商品リンクをコピーし、転送サービスの検索バーに貼り付けます。</li>
      <li>サイズやその他のオプションを選択し、カートに商品を追加します。</li>
      <li>準備ができたら、注文を確定し、商品の支払いを行います。</li>
      <li>商品が転送サービスの倉庫に到着するのを待ちます。</li>
      <li>全ての商品が到着したら、それらを選択し、国際配送用の小包を作成します。</li>
      <li>希望の配送方法を選び、国際配送料を支払います。</li>
      <li>パッケージが到着するのを待ち、新しいOLDER BROTHER製品をお楽しみください！</li>
    </ol>
  `,
  'ko': `
    <h2>해외 고객을 위한 주문 가이드</h2>
    <ol>
      <li>타오바오 스토어에서 원하는 제품을 선택하세요.</li>
      <li>배송 대행 서비스(예: Superbuy, WeGoBuy, CSSBuy)에 가입하세요.</li>
      <li>타오바오 제품 링크를 복사하여 대행 서비스의 검색창에 붙여넣으세요.</li>
      <li>사이즈와 기타 옵션을 선택한 후 장바구니에 담으세요.</li>
      <li>준비가 되면 주문을 제출하고 상품 비용을 결제하세요.</li>
      <li>상품이 대행사 창고에 도착할 때까지 기다리세요.</li>
      <li>모든 상품이 도착하면 선택하여 국제 배송용 소포를 만드세요.</li>
      <li>원하는 배송 방법을 선택하고 국제 배송비를 결제하세요.</li>
      <li>패키지가 도착할 때까지 기다린 후 새로운 OLDER BROTHER 제품을 즐기세요!</li>
    </ol>
  `,
  // Add more languages as needed
};

function loadGuide() {
  const userLanguage = detectLanguage().split('-')[0]; // Get the primary language code
  const guideContent = document.getElementById('guide-content');
  guideContent.innerHTML = guides[userLanguage] || guides['en']; // Default to English if the user's language is not available
}

window.addEventListener('load', loadGuide);
