import axios from "axios";

//CONST 상수
const PER_PAGE = 20000; //한페이지당 데이터 갯수
const API_KEY = process.env.REACT_APP_API_KEY;

//인터페이스 Interface
export interface IFoodInfo {
  [index: string]: string | number;
  "가격(원)": string;
  골목명: string;
  메뉴명: string;
  시군구: string;
  "업소 식별번호": number;
  업소명: string;
}

export interface IFoodInfos {
  [index: string]: IFoodInfo[];
  중구: IFoodInfo[];
  남구: IFoodInfo[];
  동구: IFoodInfo[];
  서구: IFoodInfo[];
  북구: IFoodInfo[];
  달서구: IFoodInfo[];
  달성군: IFoodInfo[];
  수성구: IFoodInfo[];
}

//골목별 맛집 리스트 가져오기
export async function getFoodInfoInAlley() {
  const url_page1 = `https://api.odcloud.kr/api/15097294/v1/uddi:f72f944d-b440-415d-97be-94be780dbbef?page=1&perPage=${PER_PAGE}&serviceKey=${API_KEY}`;
  const url_page2 = `https://api.odcloud.kr/api/15097294/v1/uddi:f72f944d-b440-415d-97be-94be780dbbef?page=2&perPage=${PER_PAGE}&serviceKey=${API_KEY}`;
  const url_page3 = `https://api.odcloud.kr/api/15097294/v1/uddi:f72f944d-b440-415d-97be-94be780dbbef?page=3&perPage=${PER_PAGE}&serviceKey=${API_KEY}`;
  const url_page4 = `https://api.odcloud.kr/api/15097294/v1/uddi:f72f944d-b440-415d-97be-94be780dbbef?page=4&perPage=${PER_PAGE}&serviceKey=${API_KEY}`;

  console.log(url_page1);
  return await Promise.all([
    (await axios.get(url_page1)).data.data,
    (await axios.get(url_page2)).data.data,
    (await axios.get(url_page3)).data.data,
    (await axios.get(url_page4)).data.data,
  ]);
}

//골목 리스트 가져오기
export interface IAlley {
  [index: string]: string;
  FD_CS: string;
  OPENDATA_ID: string;
  SMPL_DESC: string;
  cnt: string;
}

export interface IAlleyTemp {
  [index: string]: string[];
  중구: string[];
  남구: string[];
  동구: string[];
  서구: string[];
  북구: string[];
  달서구: string[];
  달성군: string[];
  수성구: string[];
}

export interface IAlleyArray {}
export function getAlleyList(): Promise<IAlleyTemp> {
  // const url = `https://www.daegufood.go.kr/kor/api/Alley.html?mode=json`;
  // CORS 문제 발생
  // const alleyList =axios.get(url).then(data=>{
  //     console.log(data.data);
  // });
  const alleys_temp: IAlleyTemp = {
    중구: [],
    남구: [],
    동구: [],
    서구: [],
    북구: [],
    달서구: [],
    달성군: [],
    수성구: [],
  };

  const alleyList: IAlley[] = [
    {
      cnt: "1",
      OPENDATA_ID: "TL-11",
      FD_CS: "(중구)남산동보쌈골목",
      SMPL_DESC: "이른 새벽부터 허기진 배 달래주는 돼지국밥과 보쌈~",
    },
    {
      cnt: "2",
      OPENDATA_ID: "TL-3",
      FD_CS: "(중구)동인동찜갈비골목",
      SMPL_DESC: "대차게 맵고, 화끈한 대구의 맛",
    },
    {
      cnt: "3",
      OPENDATA_ID: "TL-2",
      FD_CS: "(중구)2030골목",
      SMPL_DESC:
        "동성로의 낭만골목. 젊은이들의 웃음소리와 고기 굽는 소리가 요란한 곳",
    },
    {
      cnt: "4",
      OPENDATA_ID: "TL-1",
      FD_CS: "(중구)진골목",
      SMPL_DESC: "길이 끝나는 곳에서 새로운 길이 시작되는 곳.",
    },
    {
      cnt: "5",
      OPENDATA_ID: "TL-22",
      FD_CS: "(동구)동촌유원지명물먹거리촌",
      SMPL_DESC: "대구시민의 오랜 휴식처, 금호강변에서 즐기는 다양한 맛과 재미",
    },
    {
      cnt: "6",
      OPENDATA_ID: "TL-10",
      FD_CS: "(동구)갓바위먹거리촌",
      SMPL_DESC: "정성을 들이면 소원 한가지 씩은 꼭 들어준다는 이곳.",
    },
    {
      cnt: "7",
      OPENDATA_ID: "TL-17",
      FD_CS: "(동구)동화사먹거리촌",
      SMPL_DESC: "먹거리, 영화관, 케이블카, 공원 등 없는 것이 없는 이곳!",
    },
    {
      cnt: "8",
      OPENDATA_ID: "TL-18",
      FD_CS: "(동구)파계사먹거리촌",
      SMPL_DESC: "대구의 무더위도 잠시 쉬어가는 계곡형 산장식당.",
    },
    {
      cnt: "9",
      OPENDATA_ID: "TL-13",
      FD_CS: "(동구)평화시장닭똥집골목",
      SMPL_DESC: "부담없는 가격으로 맞이하는 대구발 닭튀김요리!",
    },
    {
      cnt: "10",
      OPENDATA_ID: "TL-8",
      FD_CS: "(서구)내당동 무침회골목",
      SMPL_DESC: "매콤, 새콤, 달콤한 대구 10味의 맛!",
    },
    {
      cnt: "11",
      OPENDATA_ID: "TL-23",
      FD_CS: "(서구)서대구로 음식거리",
      SMPL_DESC: "현대와 전통이 공존하는 볼거리가 있는 명물거리",
    },
    {
      cnt: "12",
      OPENDATA_ID: "TL-24",
      FD_CS: "(서구)인동촌 아나고골목",
      SMPL_DESC: "노릇노릇 익어가는 싱싱한 아나고에 소주한잔!",
    },
    {
      cnt: "13",
      OPENDATA_ID: "TL-9",
      FD_CS: "(서구)중리동 곱창골목",
      SMPL_DESC: "고소한 소곱창 전골 냄새가 골목가득 고소소~",
    },
    {
      cnt: "14",
      OPENDATA_ID: "TL-20",
      FD_CS: "(남구)바다맛길",
      SMPL_DESC: "대구에서 맛보는 짭 쪼름한 바다의 맛 ~",
    },
    {
      cnt: "15",
      OPENDATA_ID: "TL-21",
      FD_CS: "(남구)봉덕맛길",
      SMPL_DESC: "남구의 야식골목, 안동갈비와 횟집등 먹거리가 가득.",
    },
    {
      cnt: "16",
      OPENDATA_ID: "TL-14",
      FD_CS: "(남구)안지랑곱창골목",
      SMPL_DESC: "지글지글 고소한 냄새가 가득한 젊음의 거리",
    },
    {
      cnt: "17",
      OPENDATA_ID: "TL-5",
      FD_CS: "(남구)앞산맛둘레길",
      SMPL_DESC: "멋있다, 맛있다, 즐겁다. 녹색웰빙 먹거리 거리",
    },
    {
      cnt: "18",
      OPENDATA_ID: "TL-19",
      FD_CS: "(북구)복현오거리 먹자골목",
      SMPL_DESC: "씹을수록 고소하고 담백한 맛. 경대북문 주변 막창골목",
    },
    {
      cnt: "19",
      OPENDATA_ID: "TL-12",
      FD_CS: "(수성구)들안길 먹거리타운거리",
      SMPL_DESC: "`빼앗긴들`에 들어선 대구의 대표적 먹거리 타운",
    },
    {
      cnt: "20",
      OPENDATA_ID: "TL-25",
      FD_CS: "(달서구)모다먹거리",
      SMPL_DESC: "모다아울렛 주변 먹거리촌",
    },
    {
      cnt: "21",
      OPENDATA_ID: "TL-26",
      FD_CS: "(달서구)수밭골 웰빙음식거리",
      SMPL_DESC: "월광수변공원 옆 자연부락에 마련된 휴식공간",
    },
    {
      cnt: "22",
      OPENDATA_ID: "TL-7",
      FD_CS: "(달성군)가창우록리흑염소마을",
      SMPL_DESC: "방사흑염소를 특색있는 요리로 개발.",
    },
    {
      cnt: "23",
      OPENDATA_ID: "TL-16",
      FD_CS: "(달성군)가창찐빵골목",
      SMPL_DESC: "전국 최고의 맛을 자랑하는 추억의 옛날찐빵",
    },
    {
      cnt: "24",
      OPENDATA_ID: "TL-6",
      FD_CS: "(달성군)부곡리매운탕마을",
      SMPL_DESC: "정갈한 맛, 깨끗한 환경, 더욱 친절한 서비스",
    },
    {
      cnt: "25",
      OPENDATA_ID: "TL-15",
      FD_CS: "(달성군)비슬산 참맛길",
      SMPL_DESC: "달성군이 가장 아끼는 청정지역 !",
    },
    {
      cnt: "26",
      OPENDATA_ID: "TL-27",
      FD_CS: "(중구)방천시장 김광석 길",
      SMPL_DESC:
        "그토록 슬픈 목소리와 너무나도 환한 웃음을 지녔던 우리 시대 가객 김광석",
    },
    {
      cnt: "27",
      OPENDATA_ID: "TL-28",
      FD_CS: "(중구)대봉동 봉리단길",
      SMPL_DESC: "대구의 경리단길~",
    },
    {
      cnt: "28",
      OPENDATA_ID: "TL-29",
      FD_CS: "(중구)종로골목",
      SMPL_DESC: "",
    },
    {
      cnt: "29",
      OPENDATA_ID: "TL-30",
      FD_CS: "(북구)동천역먹거리타운",
      SMPL_DESC: "",
    },
    {
      cnt: "30",
      OPENDATA_ID: "TL-31",
      FD_CS: "(북구)학정먹골촌",
      SMPL_DESC: "",
    },
    {
      cnt: "31",
      OPENDATA_ID: "TL-32",
      FD_CS: "(북구)함지공원먹골촌",
      SMPL_DESC: "",
    },
    {
      cnt: "32",
      OPENDATA_ID: "TL-33",
      FD_CS: "(남구)앞산카페거리",
      SMPL_DESC: "앞산카페거리",
    },
    {
      cnt: "33",
      OPENDATA_ID: "TL-34",
      FD_CS: "(수성구)범어천먹거리타운",
      SMPL_DESC:
        "떡볶이와 토스트로 유명하던 신천시장이 ‘범어천 먹거리타운’으로",
    },
    {
      cnt: "34",
      OPENDATA_ID: "TL-35",
      FD_CS: "(수성구)범어먹거리타운",
      SMPL_DESC:
        "화려한 도심의 뒤안길에서 하루를 위로하며 마무리하는 ‘범어먹거리타운’",
    },
    {
      cnt: "35",
      OPENDATA_ID: "TL-36",
      FD_CS: "(수성구)수성못먹거리타운",
      SMPL_DESC: "",
    },
    {
      cnt: "36",
      OPENDATA_ID: "TL-37",
      FD_CS: "(북구)대학로먹거리타운",
      SMPL_DESC: "칠곡태전동 칠곡중앙대로 65길 인근",
    },
    {
      cnt: "37",
      OPENDATA_ID: "TL-38",
      FD_CS: "(서구)서부오미가미거리",
      SMPL_DESC: "오미가미거리",
    },
    {
      cnt: "38",
      OPENDATA_ID: "TL-39",
      FD_CS: "(북구)함지산먹골촌",
      SMPL_DESC: "칠곡의 허파",
    },
    {
      cnt: "39",
      OPENDATA_ID: "TL-40",
      FD_CS: "(북구)운암지 먹거리타운",
      SMPL_DESC: "ㅇ",
    },
    {
      cnt: "40",
      OPENDATA_ID: "TL-41",
      FD_CS: "(달서구)상인동 술골",
      SMPL_DESC: "젊음이 가득한 술집골목~",
    },
    {
      cnt: "41",
      OPENDATA_ID: "TL-42",
      FD_CS: "(달서구)두류 젊음의 거리",
      SMPL_DESC: "광장코아 주변 먹거리 천국~",
    },
    {
      cnt: "42",
      OPENDATA_ID: "TL-43",
      FD_CS: "(북구)이인성사과나무맛집골목",
      SMPL_DESC:
        "근대 최고의 천재화가 이인성의 그림을 감상할 수 있는 맛집 골목",
    },
  ];

  return new Promise((resolve, reject) => {
    alleyList.forEach((alley) => {
      let al = alley.FD_CS.split(/\(|\)/);
      alleys_temp[al[1]] = [...alleys_temp[al[1]], al[al.length - 1]];
    });

    resolve(alleys_temp);
  });
}
