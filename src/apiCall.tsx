import axios from "axios";

//CONST 상수
const PER_PAGE = 10; //한페이지당 데이터 갯수
const API_KEY = process.env.REACT_APP_API_KEY;

//인터페이스 Interface
interface IFoodInfo {
  [index: string]: string | number;
  "가격(원)": string;
  골목명: string;
  메뉴명: string;
  시군구: string;
  "업소 식별번호": number;
  업소명: string;
}

//골목별 맛집 리스트 가져오기
export async function getFoodInfoInAlley() {
  const url_page1 = `https://api.odcloud.kr/api/15097294/v1/uddi:f72f944d-b440-415d-97be-94be780dbbef?page=1&perPage=${PER_PAGE}&serviceKey=${API_KEY}`;
  const url_page2 = `https://api.odcloud.kr/api/15097294/v1/uddi:f72f944d-b440-415d-97be-94be780dbbef?page=2&perPage=${PER_PAGE}&serviceKey=${API_KEY}`;
  const url_page3 = `https://api.odcloud.kr/api/15097294/v1/uddi:f72f944d-b440-415d-97be-94be780dbbef?page=3&perPage=${PER_PAGE}&serviceKey=${API_KEY}`;
  const url_page4 = `https://api.odcloud.kr/api/15097294/v1/uddi:f72f944d-b440-415d-97be-94be780dbbef?page=4&perPage=${PER_PAGE}&serviceKey=${API_KEY}`;

  return await Promise.all([
    (await axios.get(url_page1)).data.data,
    (await axios.get(url_page2)).data.data,
    (await axios.get(url_page3)).data.data,
    (await axios.get(url_page4)).data.data,
  ]);
}

//골목 리스트 가져오기
export function getAlleyList() {}
