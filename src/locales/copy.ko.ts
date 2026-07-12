import type { SectionCopy } from './types'
import en from './copy.en'

const ko: SectionCopy = {
  ...en,
  nav: {
    startHere: '시작하기',
    topReads: '인기 글',
    destinations: '여행지',
    tripDiaries: '여행기',
    about: '소개',
    startYourBlog: '나만의 블로그 시작하기',
    signIn: '로그인',
    subscribe: '구독하기',
    myTripBlog: '내 여행 블로그',
    adminDashboard: '관리자 대시보드',
    signOut: '로그아웃',
    signedInAs: '로그인됨',
  },
  home: {
    heroEyebrow: '여행 일기 · 지도 · 공유',
    heroLine1: '라플란드로 가십니까?',
    heroLine2: '여행 블로그를 시작하세요.',
    heroLead:
      '오로라를 본 자리에 핀을 꽂으십시오. 통나무집을 사진에 담으십시오. 기온이 어땠는지 기록하십시오. 친구들이 실제로 따라 읽을 수 있는 아름다운 여행 블로그를 만드세요.',
    heroPrimaryCta: '여행 블로그 시작하기',
    heroSecondaryCta: '사용 방법 보기',
    heroFootnote: '무료 · 핀란드 제작 · Instagram 공유 · 광고 없음',
    seasonalBadge: '지금이 제철 · 백야 · 6월 6일 → 7월 7일',
    seasonalH2: '라플란드 여행을 위한 무료 여행 블로그, 여행하면서 씁니다.',
    seasonalLead:
      'Lapland.blog는 여행을 간결하고 아름다운 블로그로 만들어 줍니다. 장소에 핀을 꽂고, 사진을 더하고, 있었던 일을 적은 뒤 링크를 친구들과 공유하세요. 지금은 여름입니다. 해가 지지 않는 서른두 밤, 숲은 호박빛으로 물들고 호수는 하늘을 비춥니다. 아직 그 안에 머물러 있을 때 여행기를 시작하십시오.',
    seasonalCta1: '여행 블로그 시작하기',
    seasonalCta2: '여름 글 읽기',
    seasonalCard1Title: '24시간의 골든아워',
    seasonalCard1Body: '태양이 지평선을 스칩니다. 사진가들은 이를 지구상에서 가장 긴 블루아워라 부릅니다.',
    seasonalCard2Title: '클라우드베리 철',
    seasonalCard2Body: '7월 말, 습원이 황금빛으로 물듭니다. 현지인들은 이를 두 번째 수확이라 부릅니다.',
    seasonalCard3Title: '사우나, 그리고 호수 입수',
    seasonalCard3Body: '자정 14도의 호수, 다섯 걸음 옆 90도 사우나. 반복하십시오.',
    seasonalCard4Title: '아무도 없음',
    seasonalCard4Body: '겨울에 만실이 되는 통나무집들이 7월에는 비어 있습니다. 같은 숲, 줄 없음.',
    seasonalLabels: { light: '01 · 빛', forest: '02 · 숲', water: '03 · 물', quiet: '04 · 정적' },
    howEyebrow: '사용 방법',
    howH2Pre: '세 단계. 한 번의 여행.',
    howH2Italic: '간직할 만한 블로그.',
    howLead:
      'Lapland.blog은 라플란드를 찾는 분들을 위한 무료 여행 일기 플랫폼입니다. 귀하의 여행은 실제로 공유하고 싶어지는 블로그가 됩니다.',
    howStep1Kicker: '01단계 · 계획',
    howStep1Title: '장소에 핀을 꽂으십시오.',
    howStep1Body:
      '예약한 통나무집, 가 보고 싶은 식당, 오로라를 보러 갈 어두운 하늘의 명소를 라플란드 지도 위에 핀으로 표시하십시오. 떠나기 전에 경로를 짜십시오.',
    howStep2Kicker: '02단계 · 기록',
    howStep2Title: '여행하면서 쓰십시오.',
    howStep2Body:
      '휴대전화로, 통나무집에서, 차 안에서, 사우나에서. 사진과 기온, 수프의 맛을 더하십시오. 각 글은 그날과 그 장소에 자동으로 핀이 꽂힙니다.',
    howStep3Kicker: '03단계 · 공유',
    howStep3Title: '잘 쓰인 귀하의 여행.',
    howStep3Body:
      '귀하의 글은 lapland.blog/your-name 의 공개 블로그가 됩니다. 친구들이 따라 읽을 수 있고, 각 글은 Instagram 스토리로 내보낼 수 있습니다. 여행은 두 번 살아납니다.',
    howCta: '여행 블로그 시작하기',
    howFootnote: '여행기는 무료 · 카드 불필요 · Google로 로그인',
    liveEyebrow: '편집부의 예시 블로그',
    liveH2Pre: '여행 블로그란',
    liveH2Italic: '이런 모습입니다.',
    liveH2Tail: '다음은 귀하 차례입니다.',
    liveLead:
      '레비의 최상급 코스. 이나리의 오로라 밤. 사리셀카에서 허스키 썰매로 60km. 이 예시 블로그들은 저희 편집부인 The Field Journal이 형식을 보여 드리기 위해 만든 것입니다. 귀하의 진짜 블로그는 시작하는 데 5분도 걸리지 않습니다.',
    liveBrowseAll: '모든 블로그 보기',
    liveCta: '나의 여행 블로그 시작',
    liveFootnote: '무료 · 카드 불필요 · 첫 글까지 2분',
    featuredEyebrow: '창업자의 예시 여행기',
    featuredEvery: '모든 글 →',
    featuredLead:
      '귀하의 여행 블로그가 어떤 모습일 수 있는지 보여 드리는 예시입니다. 아래 글은 Lapland.blog의 편집부인 The Field Journal이 쓴 것으로, 백야부터 극야까지 라플란드의 한 해를 담아내는 작은 필진입니다. 진짜 기온, 진짜 통나무집, 진짜 수프. 한 편 읽어 보시고 귀하의 여행을 떠올려 보십시오.',
    featuredLoading: '예시를 불러오는 중…',
    featuredNone: '아직 예시 글이 없습니다.',
    featuredReadEntry: '이 글 읽기',
    pillarsEyebrow: '무엇을 기록할까',
    pillarsH2Pre: '라플란드 여행을,',
    pillarsH2Italic: '세 가지 갈래로.',
    pillarsLead:
      '다른 여행자들이 남긴 글들을 둘러보시고, 귀하 자신의 여행에서 다룰 갈래를 고르십시오. 오로라, 통나무집, 음식, 추위, 사람들, 그리고 그 사이에 있는 정적.',
    pillar1Kicker: 'I · 추위',
    pillar1Title: '추위가 실제로 하는 일',
    pillar1Body:
      '오로라가 뜨는 밤, 극야, 대부분의 안내서가 빠뜨리는 여덟 계절. 이곳에서 날씨는 배경이 아니라 주인공입니다. 새벽 3시 47분 영하 23도가 어떤 느낌인지, 휴대전화 배터리에 무슨 일이 벌어지는지, 사람에게 무슨 일이 벌어지는지에 대한 현장 기록.',
    pillar2Kicker: 'II · 잠자리',
    pillar2Title: '어디서 자고 어디서 먹는가',
    pillar2Body:
      '나무로 지은 통나무집, 글래스 이글루, 잘 작동하는 사우나와 그렇지 않은 사우나. 결국 그 값을 한 42유로짜리 연어 수프. 배낭 안에서도 살아남는 호밀빵, 그리고 해가 지는 일을 잊었기에 새벽 두 시에 마시는 커피.',
    pillar3Kicker: 'III · 다른 사람들',
    pillar3Title: '이 위에 사는 또 다른 사람들',
    pillar3Body:
      '순록 목축민, 스키 패트롤, 사우나 장인, 소단퀼래 외곽의 주유소에서 네 개 언어를 쓰던 분. 라플란드는 조용하지만 결코 비어 있지 않습니다. 실제로 만나는 사람들에 관한 장문의 글.',
    latestEyebrow: '예시 글',
    latestH2: '여행 블로그가 어떻게 생겼는지 보십시오.',
    latestEvery: '모든 글',
    latestLoading: '글을 불러오는 중…',
    asideEyebrow: '왜 이 사이트가 존재하는가',
    asideH2: '라플란드는 안내 책자가 아닙니다. 귀하의 여행도 그래서는 안 됩니다.',
    asideP1:
      '해마다 수천 명이 라플란드를 찾아 무언가 특별한 것을 보고, 그것을 다시는 열어 보지 않을 휴대전화 사진첩 안으로 흘려보냅니다. 통나무집 위의 오로라. 사우나에서 돌아오는 길에 손끝이 얼어붙던 산책. 어째선지 42유로 값을 하던 연어 수프. 일주일이면 사라집니다.',
    asideP2:
      'Lapland.blog은 이를 바로잡기 위한 작은 무료 도구입니다. 어디 있었는지 핀을 꽂으십시오. 무엇을 보았는지 쓰십시오. 수프를 사진에 담으십시오. 귀국할 즈음이면 진짜 여행 블로그가 손에 있게 됩니다. 친구들이 실제로 따라 읽을 수 있고, 5년 뒤에도 다시 읽고 싶어지는 블로그입니다. 스톡 사진도, "환상의 겨울 왕국"도 없습니다. 오직 그곳에 대한 귀하의 솔직한 기록만이 남습니다.',
    asideCta1: '나의 여행 블로그 시작',
    asideCta2: 'lapland.blog 소개',
    asidePill: '귀하의 여행 · 귀하의 블로그',
    travelJournalBadge: '여행기는 무료',
    faqHeading: 'lapland.blog 자주 묻는 질문',
    faq: [
      {
        q: 'lapland.blog에서 여행 블로그를 어떻게 시작하나요?',
        a: 'Google 계정으로 로그인하고 블로그 이름을 정한 뒤 첫 글을 쓰면 됩니다. 각 글에는 텍스트, 사진, 날짜, 그리고 머문 장소를 표시하는 지도 핀을 담을 수 있습니다. 블로그는 lapland.blog/내이름 주소에 만들어지며 게시하는 즉시 공유할 수 있습니다. 설치할 것도 없고 로그인 외에 따로 설정할 것도 없습니다.',
      },
      {
        q: 'lapland.blog는 무료인가요?',
        a: '네. 블로그 시작, 글쓰기, 사진 추가, 지도에 장소 핀 찍기, 블로그 공유까지 모두 무료입니다. 가입에 카드가 필요 없고 블로그에 광고도 없습니다.',
      },
      {
        q: '라플란드 블로그를 인스타그램과 페이스북에 공유할 수 있나요?',
        a: '네. 모든 블로그에는 어디에나 올릴 수 있는 공개 링크가 있고, 각 글은 인스타그램 스토리 크기의 이미지로 내보낼 수 있어 하루의 기록을 한 번의 탭으로 공유할 수 있습니다. 친구와 가족은 별도의 계정 없이도 블로그를 열어 볼 수 있습니다.',
      },
      {
        q: '여기서 블로그를 쓰려면 라플란드에 있어야 하나요?',
        a: '아니요. lapland.blog는 핀란드 라플란드로 떠나는 여행자를 위해 만들어져 지도와 글쓰기 안내가 북쪽 여행에 맞춰져 있지만, 여행을 계획 중이든 여행 중에 쓰든 집에 돌아와 정리하든 누구나 여기서 블로그를 운영할 수 있습니다. 출발 전에 시작해 하루하루 글을 추가해도 됩니다.',
      },
      {
        q: '라플란드 여행 일기에는 무엇을 쓰면 좋나요?',
        a: '잊고 싶지 않은 것이라면 무엇이든 좋습니다. 묵었던 곳, 오로라의 모습, 가장 추웠던 아침의 기온, 뜻밖에 맛있던 음식, 허스키 썰매, 숲의 고요함. 사진 한 장과 장소 핀을 곁들인 짧은 글이 잘 어울립니다. 하루 몇 줄이 쌓여 다시 읽고 싶은 블로그가 됩니다.',
      },
    ],
  },
  startHere: {
    eyebrow: '환영합니다',
    h1: '안녕하십니까. 세 가지 입구가 있습니다.',
    lead:
      'Lapland.blog은 실제로 라플란드를 찾는 분들을 위한, 무료이며 천천히 흘러가고 사진을 중심으로 한 여행 일기 사이트입니다. 여행을 계획 중이시든, 여행 도중이시든, 귀국 후에 그때 적어 둘 걸 하고 후회하시든, 자신에게 맞는 입구를 고르십시오.',
    path1Kicker: '01 · 계획',
    path1Title: '라플란드 여행을 계획 중입니다.',
    path1Body:
      '어디서 묵고, 어떻게 도착하고, 무엇을 하고, 어디서 먹을지, 실용적인 측면입니다. 예약을 다루는 LaplandVibes 자매 사이트로 안내해 드립니다.',
    path1Cta: '여행 계획하기',
    path2Kicker: '02 · 읽기',
    path2Title: '다른 사람들이 쓴 글을 읽고 싶습니다.',
    path2Body:
      '라플란드 현지에서 작성된 엄선된 시드 글: 통나무집 짐 싸기, 연어 수프의 밤, 케미 위의 오로라. 진짜 기온, 진짜 시각, 안내 책자식 어투 없음.',
    path2Cta: '추천 글',
    path3Kicker: '03 · 쓰기',
    path3Title: '지금 와 있습니다. 제 여행 블로그가 갖고 싶습니다.',
    path3Body:
      '이메일이나 Google로 로그인하십시오. lapland.blog 안의 한 자리를 받으십시오. 장소에 핀을 꽂고, 글을 쓰고, 친구들과 공유하십시오. 무료이며 함정도 유료 등급도 없습니다.',
    path3Cta: '블로그 시작하기',
    planEyebrow: '여행을 계획',
    planH2: '실용적인 부분은 자매 사이트에서.',
    planLead:
      'Lapland.blog은 일기입니다. 예약은 LaplandVibes의 각 자매 사이트에서 이루어집니다. 각 사이트는 자신이 가장 잘하는 한 가지에 집중합니다.',
    planStay: {
      kicker: '숙박',
      title: '통나무집, 이글루, 호텔',
      body: '글래스 이글루, 통나무집, 스키 리조트 등 라플란드 숙소 수백 곳을 비교하십시오.',
    },
    planTransport: {
      kicker: '이동',
      title: '항공편, 기차, 버스',
      body: '헬싱키 → 로바니에미 / 키틸레 / 이발로: 항공편, 야간열차, 실용적인 노선.',
    },
    planDo: {
      kicker: '체험',
      title: '허스키, 스노모빌, 사우나',
      body: '실제 운영업체의 예약 가능한 액티비티를, 보도자료가 아닌 후기와 함께.',
    },
    planEat: {
      kicker: '식사',
      title: '식음료',
      body: '실제로 가서 먹어 볼 만한 곳: 연어 수프, 호밀빵, 더 좋았던 시절을 기억하는 바.',
    },
    planAllSites: '또는 laplandvibes.com 에서 21개 이상의 모든 사이트 둘러보기',
    onlyEyebrow: '한 편만 읽으시려면',
    onlyH2: '이 한 편을 읽으십시오.',
    onlyLead: '가장 최근의 현장 일기. 진짜 기온, 진짜 시각, 안내 책자식 어투 없음.',
    thenEyebrow: '그다음에는',
    thenH2: '현장에서 더 가져온 글.',
    everyEntry: '모든 글',
  },
  about: {
    pageTitle: '소개 | Lapland.blog',
    pageDescription:
      'Lapland.blog은 라플란드를 찾는 분들을 위한 무료 여행 일기 플랫폼입니다. 장소에 핀을 꽂고, 글을 쓰고, 친구들과 공유하십시오. 잘 쓰인 귀하의 여행입니다.',
    eyebrow: '플랫폼 소개',
    h1: '간직할 만한 여행 일기.',
    lead:
      'Lapland.blog은 라플란드를 찾는 분들을 위한 무료 여행 일기 플랫폼입니다. 오로라를 본 자리에 핀을 꽂으십시오. 통나무집을 사진에 담으십시오. 기온이 어땠는지 기록하십시오. 귀국할 즈음이면 친구들이 실제로 따라 읽을 수 있고 5년 뒤에도 다시 읽고 싶어질 여행 블로그가 손에 들어옵니다.',
    intro:
      '대부분의 라플란드 블로그는 안내 책자처럼 읽힙니다. 대부분의 여행 일기 앱은 휴대전화 사진첩 속에 방치되거나, 하루 만에 사라지는 Instagram 게시물 한 장으로만 공유됩니다. Lapland.blog은 그 사이에 있는 무언가입니다. 이미 트래픽이 있는 도메인 아래 진짜로, 천천히, 사진을 중심으로 한 여행 블로그가 원하시는 만큼 오래 보관됩니다.',
    howHeading: '사용 방법',
    howStepPin: '머물 통나무집, 가고 싶은 식당, 빛 없는 하늘 명소에 핀을 꽂으세요. 떠나기 전에 동선을 짭니다.',
    howStepWrite: '여행하면서 씁니다. 통나무집에서, 차 안에서, 사우나에서. 사진과 기온, 수프의 맛을 더하세요.',
    howStepShare: '글은 lapland.blog/내이름 의 공개 블로그가 됩니다. 친구들이 팔로우할 수 있고, 각 글은 인스타그램 스토리로 내보낼 수 있습니다.',
    howBody:
      '이메일이나 Google로 로그인하십시오. lapland.blog/me 의 자기 자리를 받으십시오. 각 글은 대표 이미지, 장소 핀, 그리고 하고 싶은 말로 구성됩니다. 초안을 저장하고, 준비가 되면 공개하고, 친구들에게 링크를 공유하십시오. 공개된 모든 글은 색인되어 검색에 노출되며, 귀하의 여행은 더 큰 라플란드 아카이브의 한 조각이 됩니다.',
    freeHeading: '무엇이 무료인가',
    freeBody:
      '글 작성, lapland.blog/me/yourname 아래의 여행 블로그 호스팅, 사진, 뉴스레터. 작성자 측에는 유료 장벽도 프리미엄 등급도 없습니다.',
    notHeading: '여기서 볼 수 없는 것',
    notBody:
      '독자 글 안의 광고성 게시물, 블로그에 끼워 넣는 제휴 쇼핑 목록. "잊을 수 없는", "버킷리스트", "환상적인", "겨울 왕국" 같은 단어는 편집 초안에서 금지하고 있으며, 귀하의 글에서도 금하실 만한 표현입니다. 글에도, 독자에게도 좋지 않습니다.',
    seedHeading: '시드 글',
    seedBody:
      '사이트에 올라와 있는 글은 Lapland.blog의 편집부인 The Field Journal이 작성합니다. 계절, 트레일, 음식, 통나무집, 장비 — 저마다 자기 분야를 맡은 다섯 명의 이름 있는 편집 필자들입니다. 솔직하고 천천히 흘러가며 사진을 중심으로 한 여행 블로그가 어떻게 읽힐 수 있는지를 보여 드리기 위해 마련된 것입니다. 진짜 기온, 진짜 시각, 안내 책자식 어투 없음. 한 편 읽어 보시고 귀하의 여행을 떠올려 보십시오.',
    networkHeading: '네트워크 소개',
    networkBody:
      'Lapland.blog은 LaplandVibes 생태계의 일부입니다. 라플란드를 다루는 라플란드 사이트들의 네트워크입니다. 다른 사이트들은 어디로 갈지, 어디에 묵을지, 무엇을 할지를 알려 드립니다. 이 사이트는 여행 그 자체가 글로 남겨지는 곳입니다.',
    contactHeading: '문의',
    contactBody:
      '인사를 전하거나, 사실 오류를 바로잡거나, 출처를 밝힐 수 있는 사진을 보내 주시려면 info@lapland.blog 으로 메일을 보내 주십시오. 모두 읽고 일주일 안에 답해 드리려 합니다.',
    closing: '라플란드에서, 실제 그 시점의 기온과 시각으로 쓰였습니다.',
    ctaPrimary: '나만의 일기 시작하기 →',
    ctaSecondary: '또는',
    ctaSecondaryLink: '시드 글부터 먼저 읽기',
  },
  destinations: {
    pageTitle: '여행지 | Lapland.blog',
    pageDescription:
      '라플란드의 주요 여덟 곳: 로바니에미, 사리셀카, 레비, 케미, 이나리, 무오니오, 윌래스, 케미얘르비. 각 지역의 현장 일기를 읽거나, 최초의 글을 작성하십시오.',
    eyebrow: '어디로 갈까',
    h1Pre: '여덟 곳.',
    h1Italic: '하나의 라플란드.',
    lead:
      '여행지를 고르시고 그곳의 글을 읽으십시오. 비어 있는 곳은 다음에 쓰일 곳입니다. 첫 번째 작성자가 되실 수 있습니다.',
    beTheFirst: '첫 번째 작성자가 되기',
    entrySingular: '글',
    entryPlural: '글',
    readEntries: '글 읽기',
    beFirstWrite: '첫 글 쓰기',
    findStayPrefix: '이곳의 숙소 찾기:',
    dontSeeEyebrow: '찾으시는 곳이 없습니까?',
    plantH2: '깃발을 꽂으십시오.',
    plantLead:
      '이 목록에 없는 곳으로 가십니까? 소단퀼래, 포시오, 킬피스얘르비, 헤타. 그곳의 첫 글을 작성해 주시면 지도에 추가해 드립니다.',
    plantCta: '블로그 시작하기',
    places: {
      rovaniemi: {
        region: '북극권 위에',
        blurb: '라플란드의 수도. 대부분의 항공편이 내리는 곳. 여기서 북쪽으로 향하는 모든 여정의 베이스캠프입니다.',
      },
      saariselka: {
        region: '최북단, 민둥산 지대',
        blurb: '나무 없는 툰드라, 유리 이글루, 그리고 뒷문 바로 너머의 우르호 케코넨 국립공원.',
      },
      levi: {
        region: '서부 라플란드, 민둥산 지대',
        blurb: '핀란드 최대의 스키 리조트. 겨울에는 헬싱키발 직항이 있습니다. 가족 여행에 알맞은 베이스캠프.',
      },
      kemi: {
        region: '보트니아만 연안',
        blurb: '눈의 성, 쇄빙선 투어, 그리고 라플란드 최남단의 해안. 더 평탄한 땅, 바다 내음, 바다 위의 오로라.',
      },
      inari: {
        region: '사미 문화의 심장부',
        blurb: '핀란드에서 세 번째로 큰 호수. 사미 문화센터 시다(Siida). 라플란드가 유럽에서 가장 멀게 느껴지는 곳.',
      },
      muonio: {
        region: '서부 라플란드, 오로라 벨트',
        blurb: '팔라스툰투리 국립공원의 가장자리. 유럽에서 오로라 관측 확률이 가장 높은 축에 듭니다.',
      },
      yllas: {
        region: '서부 라플란드, 민둥산 지대',
        blurb: '레비의 조용한 자매. 더 넓은 슬로프, 더 느린 속도, 자기만의 계절을 지닌 산.',
      },
      kemijarvi: {
        region: '동부 라플란드, 호수 지대',
        blurb: '핀란드 최북단의 도시. 얼어붙은 호수, 걸어서 닿는 열두어 채의 오두막. 고요합니다.',
      },
    },
  },
  topReads: {
    pageTitle: '인기 글 | Lapland.blog',
    pageDescription:
      'Lapland.blog에서 어디부터 읽기 시작할지. 편집자의 큐레이션 목록: 초심자용 베스트, 오로라 글, 음식 글, 계절 글. 클릭수가 아닌 편집자의 안목으로 골랐습니다.',
    eyebrow: '편집자 추천',
    h1: '인기 글.',
    lead: '읽기 시작하실 곳입니다. 클릭이 아니라 편집자가 골랐습니다. 현장 일기가 늘어날수록 목록도 함께 자랍니다.',
    onlyEyebrow: '한 편만 읽으시려면',
    onlyH2: '편집자의 1위 글.',
    onlyLead:
      '보트니아만 위의 오로라, 새벽 3시 47분 영하 23도, 우리 누구도 찍지 못한 그 사진. Lapland.blog의 목소리를 정의하는 한 편입니다.',
    firstTimersEyebrow: '처음 오시는 분께',
    firstTimersTitle: '떠나기 전에 읽어 두시면 좋을 세 편.',
    firstTimersSubtitle:
      '왜 많은 분들이 오로라를 오해하시는지, 통나무집에 무엇을 챙겨 가야 하는지, 극야가 의외로 괜찮은 이유. 미리 읽으시면 현지에서 덜 놀라실 겁니다.',
    auroraEyebrow: '오로라 글',
    auroraTitle: '밤하늘 글.',
    auroraSubtitle: '쫓는 일, 사진에 담는 일, 그래도 모습을 드러내는 밤들에 관하여.',
    cabinsEyebrow: '통나무집',
    cabinsTitle: '뫼키(mökki) 글.',
    cabinsSubtitle:
      '라플란드 숲속 통나무집이 실제로 어떤 곳인지: 장작불, 사우나, 정적, 그리고 영하 30도의 옥외 화장실에 대해 아무도 말해 주지 않는 부분.',
    foodEyebrow: '식음료',
    foodTitle: '주방 글.',
    foodSubtitle:
      '42유로짜리 연어 수프, 배낭 안에서도 살아남는 호밀빵, 해가 지는 일을 잊은 탓에 새벽 두 시에 마시는 커피.',
    seasonalEyebrow: '계절',
    seasonalTitle: '추위가 실제로 하는 일.',
    seasonalSubtitle:
      '카모스(극야), 대부분의 안내서가 빠뜨리는 라플란드의 여덟 계절, 그리고 태양 없이 12월을 통과하는 작은 일.',
    ctaEyebrow: '다음은 귀하의 여행입니까?',
    ctaH2: '이 페이지의 다음 글이 되십시오.',
    ctaLead:
      '위 목록들은 독자가 쓰실 때 함께 자랍니다. 로그인하셔서 몇 편을 작성하시면, 편집자가 어울리는 글을 골라 소개합니다.',
    ctaButton: '블로그 시작하기',
  },
  archive: {
    pageTitle: '모든 글 | Lapland.blog',
    pageDescription:
      'Lapland.blog의 모든 글. 오로라, 통나무집, 음식, 계절, 사람, 장비, 그리고 라플란드에서 보내 드리는 장문의 글.',
    eyebrow: '아카이브',
    h1: '모든 글.',
    lead:
      '알고리즘도 편집의 잔재주도 없습니다. 가장 최근 글이 맨 위에 놓입니다. 필터로 범위를 좁히시거나, 이미 찾으시는 것을 아신다면 검색을 이용하십시오.',
    all: '전체',
    filterAria: '카테고리로 필터',
    searchSr: '글 검색',
    searchPlaceholder: '제목, 태그 검색…',
    loading: '글을 불러오는 중…',
    emptyTitle: '해당하는 글이 없습니다.',
    emptyBody: '필터를 해제하시거나 다른 단어로 검색해 보십시오.',
  },
  category: {
    allStoriesBack: '모든 글',
    categoryPrefix: '카테고리',
    storySingular: '글',
    storyPlural: '글',
    loading: '글을 불러오는 중…',
    emptyTitle: '아직 글이 없습니다.',
    emptyBody: '이 카테고리는 첫 글을 기다리고 있습니다. 잠시 후 다시 들러 주십시오.',
    emptyLink: '모든 글 둘러보기 →',
    keepExploringEyebrow: '계속 둘러보기',
    otherThemes: '다른 주제',
    themes: {
      aurora: {
        name: '오로라',
        tagline: '하늘이 협조하는 밤.',
        description:
          '오로라 아래에서 보낸 밤들, 있는 그대로. 날씨, Kp 지수, 기다림, 추위, 그리고 정말로 마음에 남는 순간들.',
        metaTitle: '핀란드 라플란드의 오로라 이야기 · Lapland.blog',
        metaDescription:
          '핀란드 라플란드의 오로라 밤을 있는 그대로: 날씨, Kp 지수, 기다림, 추위, 그리고 정말로 마음에 남는 순간들.',
      },
      cabins: {
        name: '통나무집',
        tagline: '벽 네 개, 난로 하나, 와이파이 제로.',
        description:
          '통나무집, 유리 이글루, 잘 되는 사우나와 안 되는 사우나. 도시에서 멀리 떨어져 잠드는 건 실제로 어떤 느낌인지.',
        metaTitle: '핀란드 라플란드의 통나무집 숙박 · Lapland.blog',
        metaDescription:
          '통나무집, 유리 이글루, 잘 되는 사우나와 안 되는 사우나. 핀란드 라플란드에서 도시와 멀리 떨어져 잠드는 실제 느낌.',
      },
      food: {
        name: '음식',
        tagline: '겨울 라플란드의 맛.',
        description:
          '연어 수프, 호밀빵, 세 가지 방식의 순록 요리, 그리고 해가 지는 걸 잊어서 새벽 2시에 마시는 커피.',
        metaTitle: '핀란드 라플란드의 음식 · Lapland.blog',
        metaDescription:
          '연어 수프, 호밀빵, 세 가지 방식의 순록 요리, 그리고 해가 지는 걸 잊은 새벽 2시의 커피. 라플란드에서 먹는다는 것.',
      },
      seasons: {
        name: '계절',
        tagline: '넷이 아니라 여덟.',
        description:
          '12월의 극야. 6월의 백야. 9월의 루스카. 네 개가 아닌 여덟 개의 뚜렷한 계절. 어느 것도 겉치레가 아닙니다.',
        metaTitle: '핀란드 라플란드의 여덟 계절 · Lapland.blog',
        metaDescription:
          '12월의 극야, 6월의 백야, 9월의 루스카. 핀란드 라플란드에는 네 개가 아닌 여덟 개의 뚜렷한 계절이 있습니다.',
      },
      people: {
        name: '사람들',
        tagline: '이 북쪽에서 만나는 사람들.',
        description:
          '순록 목동, 스키 패트롤, 사우나 마스터, 호텔 로비의 낯선 사람들. 라플란드는 조용하지만 결코 비어 있지 않습니다.',
        metaTitle: '핀란드 라플란드의 사람들 · Lapland.blog',
        metaDescription:
          '순록 목동, 스키 패트롤, 사우나 마스터, 호텔 로비의 낯선 사람들. 라플란드는 조용하지만 결코 비어 있지 않습니다.',
      },
      gear: {
        name: '장비',
        tagline: '영하 25도를 견디는 것들.',
        description:
          '부츠, 장갑, 레이어링, 배터리, 카메라 선택. 영하 25도에서 정말로 쓸 만한 것과 내가 버린 것.',
        metaTitle: '핀란드 라플란드에서 통하는 장비 · Lapland.blog',
        metaDescription:
          '부츠, 장갑, 레이어링, 배터리, 카메라 선택. 영하 25도에서 정말로 쓸 만한 것과 내가 버린 것.',
      },
      stories: {
        name: '이야기',
        tagline: '먼 길을 돌아가는 이야기.',
        description:
          '긴 글. 하나의 여행, 하나의 밤, 하나의 이상한 오후. 글이 800단어를 넘고 싶어질 때.',
        metaTitle: '핀란드 라플란드의 긴 글 · Lapland.blog',
        metaDescription:
          '핀란드 라플란드에서 온 긴 글: 하나의 여행, 하나의 밤, 하나의 이상한 오후. 800단어를 넘고 싶어지는 글을 위해.',
      },
    },
  },
  post: {
    allStories: '모든 글',
    by: '작성자',
    minRead: '분 소요',
    loadingStory: '글을 불러오는 중…',
    readNextEyebrow: '다음으로 읽기',
    readNextH2: '일기에서 더 보기',
    tagged: '태그',
    exploreMore: 'LaplandVibes 네트워크에서 더 둘러보기',
    editorialLabel: 'Field Journal 글',
    editorialNote: '정직한 여행 일기가 어떤 모습인지 보여 주기 위해 Lapland.blog의 편집 목소리 The Field Journal이 쓴 몇 편의 샘플 글 중 하나입니다. 장소와 기온은 모두 실제이며, 여러분의 글은 여러분이 직접 씁니다.',
  },
  signIn: {
    pageTitle: '라플란드 여행을 계획하세요 | Lapland.blog',
    pageDescription:
      '무료 여행 페이지, 맞춤 팁, 라플란드 여정에 맞는 최적의 혜택을 받아 보십시오. 언제 방문하시는지 알려 주시면 모든 단계를 함께 계획해 드립니다.',
    back: '뒤로',
    eyebrow: '무료 여행 페이지',
    h1Pre: '계획하세요:',
    h1Italic: '라플란드 여행.',
    lead:
      'lapland.blog/yourname 에서 본인의 페이지를 받으십시오. 여행 이야기를 쓰고, 사진을 공유하고, 여정에 맞춘 팁과 혜택을 받으십시오. 언제 오시는지 알려 주시면 모든 단계를 도와 드립니다.',
    benefit1Title: '라플란드 지도에 경로 핀 꽂기',
    benefit1Body: '통나무집, 식당, 오로라 명소: 출발 전에 미리 핀을 꽂으십시오.',
    benefit2Title: '휴대전화로 글 작성',
    benefit2Body: '통나무집에서, 차 안에서, 사우나에서. 사진, 날씨, 이야기.',
    benefit3Title: '한 번의 탭으로 Instagram 공유',
    benefit3Body: '각 글은 세로형 스토리로 내보내져, 친구들이 실제로 열어 봅니다.',
    footnote: '여행기는 무료 · 신용카드 불필요 · 핀란드 제작',
    sentTitle: '받은편지함을 확인해 주십시오',
    sentBody:
      '{email} 로 매직 링크를 보냈습니다. 링크를 누르시면 여행 블로그가 활성화됩니다. 링크는 한 시간 후 만료됩니다.',
    useDifferent: '다른 이메일로 다시 시도',
    reserveEyebrow: '페이지 예약',
    formH2: '라플란드 여행 계획',
    formLead: '방문 시점에 맞춰 여행 페이지를 만들어 드리고 맞춤 팁을 보내 드립니다.',
    emailLabel: '이메일',
    emailPlaceholder: 'you@example.com',
    travelLabel: '라플란드를 언제 방문하십니까?',
    monthLabel: '월…',
    yearLabel: '연도…',
    noDates: '아직 꿈만 꾸는 중, 날짜 미정',
    enterEmail: '시작하시려면 이메일을 입력해 주십시오.',
    sending: '매직 링크를 보내는 중…',
    submitCta: '나의 여행 페이지 예약',
    months: [
      '1월','2월','3월','4월','5월','6월',
      '7월','8월','9월','10월','11월','12월',
    ],
  },
  unsubscribe: {
    pageTitle: '구독 해지 | Lapland.blog',
    pageDescription: 'Lapland.blog 뉴스레터를 구독 해지합니다. 한 번의 클릭, 붙잡지 않습니다.',
    eyebrow: '뉴스레터',
    h1: '구독 해지',
    successTitle: '구독이 해지되었습니다.',
    successBody:
      '떠나시게 되어 아쉽습니다. Lapland.blog에서 더 이상 메일을 보내 드리지 않습니다. 마음이 바뀌시면 모든 페이지에 등록 양식이 있습니다.',
    backHome: '← 홈으로 돌아가기',
    lead: '구독하신 이메일을 입력해 주십시오. 한 번의 클릭으로 해지됩니다. 확인 반복도, 설문도 없습니다.',
    emailPlaceholder: 'your@email.com',
    processing: '처리 중…',
    submit: '구독 해지',
  },
  notFound: {
    pageTitle: '페이지를 찾을 수 없음 | Lapland.blog',
    pageDescription: '이 페이지는 존재하지 않습니다. 이동, 이름 변경, 또는 눈 속에 잃어버렸을 수 있습니다.',
    eyebrow: '페이지 없음 · 404',
    h1: '눈 속에서 길을 잃었습니다.',
    body: '이 페이지는 존재하지 않거나 아직 존재하지 않습니다. 어느 쪽이든 블로그의 나머지는 이쪽에 있습니다.',
    backHome: '홈으로 돌아가기',
    allStories: '모든 글 →',
  },
  chrome: {
    readTheStory: '이야기 읽기',
    shareThisStory: '이 이야기 공유하기',
    inThisStory: '이 이야기 속에서',
    fieldJournalEntry: '필드 저널 기록',
    liveTripBlog: '예시 여행 블로그',
    yoursCouldBeNext: '다음은 당신의 차례일 수 있습니다.',
    featuredBadge: '추천',
    minRead: '분 분량',
    exampleBadge: '예시',
    byEditorial: '편집부 예시',
    entriesLabel: '개의 기록',
    daysLabel: '일',
    yourTripYourBlog: '귀하의 여행 · 귀하의 블로그',
    startFree: '무료. 시작까지 2분. 영원히 귀하의 것입니다.',
    startMine: '내 블로그 시작',
    examples: {
      aurora: {
        title: '다섯 밤, 네 번의 오로라, 얼어붙은 삼각대 하나',
        snippet:
          'Kp 지수는 2였습니다. 하늘은 달랐습니다. 21시 14분부터 23시 40분까지 이어진 빛기둥을 영하 27도에서 찍었습니다.',
      },
      cabin: {
        title: '통나무집, 와이파이 없이, 세상과 떨어진 8일',
        snippet:
          '아침마다 장작을 팼습니다. 밤마다 사우나를 했습니다. 몇 년 만에 가장 깊이 잤습니다.',
      },
      forest: {
        title: '소나무 숲에서 보낸 여섯 번의 고요한 아침',
        snippet:
          '매일 07:30에 오두막을 나섰습니다. 음악도, 휴대전화도 없이. 갓 내린 눈 위에서 삐걱이는 부츠 소리뿐이었습니다.',
      },
      nightforest: {
        title: '영하 22도의 가문비나무 숲은 어떤 소리가 나는가',
        snippet:
          '아무 소리도 없습니다. 그러다 백 미터 밖에서 나뭇가지 하나가 부러지는 소리. 그 소리는 멀리, 아주 멀리까지 갑니다.',
      },
      silence: {
        title: '나무 한 그루, 호수 하나, 블루아워의 한 시간',
        snippet:
          '호숫가가 보이지 않을 때까지 얼음 위를 걸었습니다. 소나무 한 그루. 바람 한 점 없이. 고요라는 말을 다르게 이해하게 됐습니다.',
      },
      food: {
        title: '42유로짜리 연어 수프 한 그릇, 그 후기',
        snippet:
          '호밀빵과 돌돌 말린 버터가 함께 나왔습니다. 8분 만에 다 먹었습니다. 한 그릇을 더 시켰습니다.',
      },
    },
  },
  footer: {
    ...en.footer,
    networkBadge: '라플란드 네트워크',
    tagline: '라플란드 블로그: 정직한 여행기, 사미 문화, 오로라, 그리고 북극의 밤하늘.',
    travelGuide: '라플란드 여행 가이드',
    aboutEyebrow: 'Lapland Blog 소개',
    aboutBody: '진정한 라플란드 블로그: 현지 작가가 큐레이션한 여행기, 사미 문화, 오로라, 그리고 북극의 일상.',
    aboutBadge: '독립 운영 · 출처 명시',
    spottedError: { title: '오류를 발견하셨나요?', body: '수정이 필요한 부분이 있다면 알려주세요. 즉시 수정합니다.', cta: '오류 신고 →' },
    partner: { title: '파트너십', body: '21개 이상의 라플란드 사이트에서 광고와 협업.', cta: '문의하기 →' },
    press: { title: '언론 및 미디어', body: '편집 파트너십 및 보도자료 키트.', cta: '언론 문의 →' },
    copyright: '© {{year}} #LaplandVibes · #LaplandVibes 네트워크의 일부',
    websiteBy: '웹사이트 제작: Yrityspaketit.fi',
    privacy: '개인정보처리방침',
    cookiePolicy: '쿠키 정책',
    terms: '이용약관',
    contact: '연락처',
    groups: { stay: '숙박', eatDrink: '식음료', do: '액티비티', explore: '탐험', essentials: '필수 정보' },
  },
  newsletter: {
    ...en.newsletter,
    eyebrow: '#LaplandVibes 뉴스레터',
    h2: '주간 라플란드 소식',
    lead: '의 짧은 메일: 새로운 여행기, 사우나 팁, 오로라 알림, 그리고 우리가 들려드리고 싶은 라플란드 이야기.',
    placeholder: 'your@email.com',
    subscribing: '등록 중…',
    subscribe: '구독하기',
    successTitle: '구독이 완료되었습니다.',
    successBody: '받은편지함을 확인해 주세요. 환영 메일이 곧 도착합니다.',
    alreadyTitle: '이미 구독 중이십니다',
    alreadyBody: '이미 명단에 있으십니다. 양질의 콘텐츠가 계속 전달됩니다.',
    agreeText: '구독함으로써 다음에 동의하신 것으로 간주됩니다',
    privacyLink: '개인정보처리방침',
    unsubscribeNote: '언제든지 구독을 해지하실 수 있습니다. 이메일은 외부에 공유되지 않습니다.',
  },
  cookieBanner: {
    headline: '쿠키 사용 안내',
    body: '사이트 분석을 위해 쿠키를 사용합니다. 자세한 내용은 쿠키 정책을 참조해 주세요.',
    accept: '동의',
    decline: '거부',
  },
};

export default ko
