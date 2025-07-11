// 你的产品库 PRODUCT_CATALOG
const PRODUCT_CATALOG = [
  {
    keywords: ['letenspaceship', 'male', 'masturbator'],
    name: 'LetenSpaceship',
    url: 'https://vivevibe.com/products/automatic-male-masturbator-letenspaceship',
    img: 'https://cdn.shopify.com/s/files/1/0940/0539/5765/files/LetenSpaceshipAutomaticMaleMasturbator_1.gif?v=1748436464',
    desc: 'Experience pleasure with LetenSpaceship, an automatic male masturbator featuring 10 modes. Designed for discreet fun, this product offers a unique solution for solo play. Shop now for a new level of pleasure!'
  },
  {
    keywords: ['male', 'masturbator', 'realisticlover'],
    name: 'RealisticLover',
    url: 'https://vivevibe.com/products/automatic-male-masturbator-realisticlover',
    img: 'https://cdn.shopify.com/s/files/1/0940/0539/5765/files/RealisticLoverAutomaticMaleMasturbator_2.webp?v=1748445538',
    desc: 'Experience the ultimate pleasure with our RealisticLover automatic male masturbator. Featuring 10 modes for varied sensations, this realistic device offers discreet and satisfying self-pleasure. Shop now for a new level of intimacy!'
  },
  {
    keywords: ['male', 'masturbator', 'venus'],
    name: 'Venus',
    url: 'https://vivevibe.com/products/automatic-male-masturbator-venus',
    img: 'https://cdn.shopify.com/s/files/1/0940/0539/5765/files/VenusAutomaticMaleMasturbator_1.webp?v=1748445701',
    desc: 'Unlock new sensations with Venus, an automatic male masturbator featuring a realistic interior and powerful suction. Designed for discreet and satisfying solo play. Shop now to elevate your pleasure!'
  },
  {
    keywords: ['male', 'masturbator', 'milkyway'],
    name: 'MilkyWay',
    url: 'https://vivevibe.com/products/automatic-male-masturbator-milkyway',
    img: 'https://cdn.shopify.com/s/files/1/0940/0539/5765/files/MilkyWayAutomaticMaleMasturbator_1.webp?v=1748445701',
    desc: 'MilkyWay brings out-of-this-world pleasure. This automatic male masturbator features various modes and a lifelike interior for ultimate satisfaction. Shop now for an upgraded solo experience!'
  },
  {
    keywords: ['male', 'masturbator', 'mars'],
    name: 'Mars',
    url: 'https://vivevibe.com/products/automatic-male-masturbator-mars',
    img: 'https://cdn.shopify.com/s/files/1/0940/0539/5765/files/MarsAutomaticMaleMasturbator_1.webp?v=1748445702',
    desc: 'Mars is designed for pleasure seekers. An automatic male masturbator with unique features and modes, perfect for those looking for new sensations. Shop now and explore!'
  },
  {
    keywords: ['male', 'masturbator', 'inspace'],
    name: 'InSpace',
    url: 'https://vivevibe.com/products/automatic-male-masturbator-inspace',
    img: 'https://cdn.shopify.com/s/files/1/0940/0539/5765/files/InSpaceAutomaticMaleMasturbator_1.webp?v=1748445703',
    desc: 'Go beyond with InSpace. This automatic male masturbator features multiple modes and an ergonomic design. Discreet, powerful, and ready for pleasure. Shop now for a stellar solo session!'
  },
  {
    keywords: ['male', 'masturbator', 'pocket', 'cup'],
    name: 'Leten Pocket Cup',
    url: 'https://vivevibe.com/products/leten-pocket-cup',
    img: 'https://cdn.shopify.com/s/files/1/0940/0539/5765/files/LetenPocketCup_1.webp?v=1748770425',
    desc: 'Compact and portable, Leten Pocket Cup is the ideal male masturbator for on-the-go pleasure. Soft interior and discreet design. Shop now for instant satisfaction!'
  },
  {
    keywords: ['male', 'masturbator', 'pocket', 'cup'],
    name: 'Leten Pocket Cup 3Pcs',
    url: 'https://vivevibe.com/products/leten-pocket-cup-3pcs',
    img: 'https://cdn.shopify.com/s/files/1/0940/0539/5765/files/LetenPocketCup_3pcs_1.webp?v=1748770484',
    desc: 'Triple the fun! Leten Pocket Cup 3Pcs set offers variety for every mood. Soft texture, discreet and portable. Shop now and enjoy!'
  },
  {
    keywords: ['male', 'masturbator', 'luvos'],
    name: 'Luvos',
    url: 'https://vivevibe.com/products/automatic-male-masturbator-luvos',
    img: 'https://cdn.shopify.com/s/files/1/0940/0539/5765/files/LuvosAutomaticMaleMasturbator_1.webp?v=1748770518',
    desc: 'Luvos brings you closer to pleasure with an automatic male masturbator that features advanced suction and multiple modes. Shop now and discover the next level!'
  },
  {
    keywords: ['male', 'masturbator', 'cosmo'],
    name: 'Cosmo',
    url: 'https://vivevibe.com/products/automatic-male-masturbator-cosmo',
    img: 'https://cdn.shopify.com/s/files/1/0940/0539/5765/files/CosmoAutomaticMaleMasturbator_1.webp?v=1748770525',
    desc: 'Cosmo, an automatic male masturbator with cutting-edge design and realistic sensation. Discover new dimensions of pleasure—shop now!'
  },
  {
    keywords: ['penis', 'pumping', 'automatic', 'pump', 'male'],
    name: 'Automatic Penis Pump',
    url: 'https://vivevibe.com/products/automatic-penis-pump',
    img: 'https://cdn.shopify.com/s/files/1/0940/0539/5765/files/AutomaticPenisPump_1.webp?v=1748770544',
    desc: 'Enhance your experience with our Automatic Penis Pump. Features powerful suction, digital controls, and comfortable fit. Shop now for noticeable results!'
  },
  {
    keywords: ['pumping', 'manual', 'pump', 'male', 'penis'],
    name: 'Manual Penis Pump',
    url: 'https://vivevibe.com/products/manual-penis-pump',
    img: 'https://cdn.shopify.com/s/files/1/0940/0539/5765/files/ManualPenisPump_1.webp?v=1748770565',
    desc: 'Take control with the Manual Penis Pump. Safe, effective, and easy to use. Achieve the results you want—shop now!'
  },
  {
    keywords: ['vibrator', 'egg', 'love', 'wireless'],
    name: 'Love Egg Wireless Vibrator',
    url: 'https://vivevibe.com/products/love-egg-wireless-vibrator',
    img: 'https://cdn.shopify.com/s/files/1/0940/0539/5765/files/LoveEggWirelessVibrator_1.webp?v=1748770607',
    desc: 'Love Egg Wireless Vibrator: Ultimate discreet pleasure. Enjoy powerful vibrations, wireless control, and a smooth design. Shop now for sensational fun!'
  },
  {
    keywords: ['female', 'sucking', 'rose', 'vibrator', 'clit'],
    name: 'Rose Sucking Vibrator',
    url: 'https://vivevibe.com/products/rose-sucking-vibrator',
    img: 'https://cdn.shopify.com/s/files/1/0940/0539/5765/files/RoseSuckingVibrator_1.webp?v=1748770678',
    desc: 'Discover the Rose Sucking Vibrator. Gentle suction, soft touch, and stunning design for the ultimate in clitoral pleasure. Shop now and bloom!'
  },
  {
    keywords: ['female', 'tongue', 'vibrator', 'sucking'],
    name: 'Tongue Sucking Vibrator',
    url: 'https://vivevibe.com/products/tongue-sucking-vibrator',
    img: 'https://cdn.shopify.com/s/files/1/0940/0539/5765/files/TongueSuckingVibrator_1.webp?v=1748770714',
    desc: 'Experience unique sensations with the Tongue Sucking Vibrator. Designed to mimic a real tongue for intense clitoral stimulation. Shop now!'
  },
  {
    keywords: ['rabbit', 'vibrator', 'rotating'],
    name: 'Rotating Rabbit Vibrator',
    url: 'https://vivevibe.com/products/rotating-rabbit-vibrator',
    img: 'https://cdn.shopify.com/s/files/1/0940/0539/5765/files/RotatingRabbitVibrator_1.webp?v=1748770724',
    desc: 'Double the fun! Rotating Rabbit Vibrator features internal and external stimulation. Multiple modes, ergonomic shape—shop now for blended orgasms!'
  },
  {
    keywords: ['female', 'g', 'spot', 'vibrator', 'g-spot'],
    name: 'G-Spot Vibrator',
    url: 'https://vivevibe.com/products/g-spot-vibrator',
    img: 'https://cdn.shopify.com/s/files/1/0940/0539/5765/files/GSpotVibrator_1.webp?v=1748770732',
    desc: 'Target your pleasure with the G-Spot Vibrator. Curved design and powerful vibrations for perfect G-spot stimulation. Shop now!'
  },
  {
    keywords: ['anal', 'vibrator', 'bullet'],
    name: 'Bullet Anal Vibrator',
    url: 'https://vivevibe.com/products/bullet-anal-vibrator',
    img: 'https://cdn.shopify.com/s/files/1/0940/0539/5765/files/BulletAnalVibrator_1.webp?v=1748770739',
    desc: 'Bullet Anal Vibrator: Compact, powerful, and waterproof. Perfect for beginners or advanced play. Shop now for new sensations!'
  },
  {
    keywords: ['anal', 'plug', 'remote', 'vibrator'],
    name: 'Remote Anal Plug Vibrator',
    url: 'https://vivevibe.com/products/remote-anal-plug-vibrator',
    img: 'https://cdn.shopify.com/s/files/1/0940/0539/5765/files/RemoteAnalPlugVibrator_1.webp?v=1748770757',
    desc: 'Remote Anal Plug Vibrator—enjoy wireless control, powerful vibrations, and a comfortable fit. Shop now for hands-free pleasure!'
  }
];

// 智能多产品匹配函数
function getMatchedProducts(userMsg) {
  userMsg = userMsg.toLowerCase();
  const results = [];
  for (const prod of PRODUCT_CATALOG) {
    for (const kw of prod.keywords) {
      if (userMsg.includes(kw.toLowerCase())) {
        results.push(prod);
        break;
      }
    }
  }
  // 最多只推荐3个（你可自定义数量）
  return results.slice(0, 3);
}

// 极简风格卡片
function getProductCard(product) {
  return `
    <div style="display:flex;align-items:center;border:1px solid #f3e1f7;border-radius:10px;padding:12px 10px;margin:14px 0 8px 0;background:#fafaff;gap:12px;">
      <img src="${product.img}" alt="${product.name}" style="width:60px;height:60px;object-fit:cover;border-radius:10px;">
      <div>
        <div style="font-weight:600;font-size:15px;">${product.name}</div>
        <div style="font-size:13px;color:#555;margin-bottom:4px;">${product.desc}</div>
        <a href="${product.url}" target="_blank" style="font-size:13px;color:#e91e63;text-decoration:underline;">See Details &gt;</a>
      </div>
    </div>
  `;
}

export default async function handler(req, res) {
  try {
    const { prompt } = JSON.parse(req.body);

    // 环境变量API Key
    const apiKey = process.env.OPENAI_API_KEY;

    // 系统提示语定制AI风格
    const systemPrompt = "You are a professional sex toy advisor for vivevibe.com. Recommend relevant products and keep a fun, young tone. Always use English.";
    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ];

    // 调用OpenAI获得基础AI回复
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages
      })
    });
    const data = await openaiRes.json();

    let reply = data.choices && data.choices[0] && data.choices[0].message.content
      ? data.choices[0].message.content
      : "Sorry, the AI is taking a break. Try again soon!";

    // 多产品智能推荐
    const matchedProducts = getMatchedProducts(prompt);
    if (matchedProducts.length > 0) {
      reply += `<div style="margin-top:18px;font-weight:600;font-size:15px;">Recommended for you:</div>`;
      matchedProducts.forEach(prod => {
        reply += getProductCard(prod);
      });
    }

    res.status(200).json({ reply });

  } catch (err) {
    res.status(500).json({ reply: "Server Error: " + err.message });
  }
}
