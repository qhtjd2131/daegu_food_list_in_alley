# 대구 맛집 골목 소개 앱
공공데이터포털의 OPEN API를 활용하여 대구 내 골목에서 운영하는 업소 리스트 소개와 메뉴 소개입니다.
<br>
배포 사이트 : https://keen-lichterman-6dd24d.netlify.app/

## 초기 데이터 셋

```json
"data": [
    {
      "가격(원)": "60000",
      "골목명": "바다맛길",
      "메뉴명": "참돔(2人)",
      "시군구": "남구",
      "업소 식별번호": 0,
      "업소명": "두류회타운"
    },
    {
      "가격(원)": "80000",
      "골목명": "바다맛길",
      "메뉴명": "참돔(3人)",
      "시군구": "남구",
      "업소 식별번호": 0,
      "업소명": "두류회타운"
    },
    {
      "가격(원)": "100000",
      "골목명": "바다맛길",
      "메뉴명": "참돔(4人)",
      "시군구": "남구",
      "업소 식별번호": 0,
      "업소명": "두류회타운"
    },
    ...
];
```

OPEN API를 통해 받아온 DATA의 모양이다. 여기에는 프로젝트에서 바로 활용할 수 없는 문제점이 있다.
1. 중복되는 데이터가 너무 많음
2. 가독성이 떨어짐
3. 분류가 되어있지 않음

이를 해결하기 위해 데이터를 분류하였다. 자세한 내용은 아래에서 참고하자.

## 데이터분류

### (초기) 효율성을 생각하지 않고 결과만을 위한 분류
우선 결과물을 만들고 리팩토링해야겠다는 생각이 들었다. 그래서 일단 분류해보았다.

//데이터분류 함수 설명
**1. 지역별 데이터 분류**
```javascript
export function classifyData(data: IFoodInfo[]): Promise<IFoodInfos> {
  return new Promise((resolve, reject) => {
    let case_1_arr: IFoodInfo[] = []; //중구
    let case_2_arr: IFoodInfo[] = []; //남구
    let case_3_arr: IFoodInfo[] = []; //서구
    let case_4_arr: IFoodInfo[] = []; //동구
    let case_5_arr: IFoodInfo[] = []; //달서구
    let case_6_arr: IFoodInfo[] = []; //달성군
    let case_7_arr: IFoodInfo[] = []; //수성구
    let case_8_arr: IFoodInfo[] = []; //북구

    data.forEach((mdata) => {
      switch (mdata.시군구) {
        case "중구":
          case_1_arr.push(mdata);
          break;
        case "남구":
          case_2_arr.push(mdata);
          break;
        case "서구":
          case_3_arr.push(mdata);
          break;
        case "동구":
          case_4_arr.push(mdata);
          break;
        case "달서구":
          case_5_arr.push(mdata);
          break;
        case "달성군":
          case_6_arr.push(mdata);
          break;
        case "수성구":
          case_7_arr.push(mdata);
          break;
        case "북구":
          case_8_arr.push(mdata);
          break;
      }
    });
    const temp: IFoodInfos = {
      중구: case_1_arr,
      남구: case_2_arr,
      서구: case_3_arr,
      동구: case_4_arr,
      달서구: case_5_arr,
      달성군: case_6_arr,
      수성구: case_7_arr,
      북구: case_8_arr,
    };
    resolve(temp);
  });
}
```
- 문제점
    - 쓸데없이 긴 코드로 인한 가독성 저하
    - 반복문 속 많은 조건 검사

![image](https://user-images.githubusercontent.com/34260967/158298404-e5689364-5acd-4d7d-97d6-035bd92f9f10.png)

데이터 분류 경과시간이 약 5~6 ms 정도 걸린다. 

**2 .하나의 지역 데이터를 업소중심으로 가공**
```javascript
export const classifyDataInRes = (
  restaurantListInAlley: IFoodInfo[]
): Promise<IRestaurantListInAlley> => {
  return new Promise((resolve, reject) => {
    let temp: any = {};
    restaurantListInAlley.forEach((value: any) => {
      const restaurantIndex = value["업소 식별번호"];
      if (temp[restaurantIndex]) {
        temp[restaurantIndex].menu = [
          ...temp[restaurantIndex].menu,
          {
            menuName: value.메뉴명,
            cost: value["가격(원)"],
          },
        ];
      } else {
        temp[restaurantIndex] = {
          restaurantName: value.업소명,
          alleyName: value.골목명,
          location: value.시군구,
          menu: [
            {
              menuName: value.메뉴명,
              cost: value["가격(원)"],
            },
          ],
        };
      }
    });
    resolve(temp);
  });
};
```

- 문제점
    - spread 표현의 비효율적인 사용.


![image](https://user-images.githubusercontent.com/34260967/158301651-9c3e9b43-7140-4786-8f5d-6a1e9f853ea2.png)

순서대로 [79, 69, 63, 58, 51, 37, 19, 9] ms 의 시간이 걸렸다.

**3. 골목별로 분류된 데이터를 업소별 데이터로 분류**
```javascript
function classifyDataInAlley(
  data: IRestaurantListInAlley,
  alleyName: string
): Promise<IRestaurant[]> {
  return new Promise((resolve, reject) => {
    const arrayData: IRestaurant[] = [];
    Object.keys(data).forEach((restaurantIndex) => {
      arrayData.push(data[restaurantIndex]);
    });
    const temp = arrayData.filter((restaurantInfo: any) => {
      return restaurantInfo.alleyName === alleyName;
    });
    resolve(temp);
  });
}
```

- 문제점
    - 불필요한 데이터 순회가 있음.

![image](https://user-images.githubusercontent.com/34260967/158306829-caf7eb14-d201-4e3b-9f50-1e422ef060b0.png)

경과시간은 257 ms 이다.

### 어떻게 효율적이게 만들 수 있을까?(시간단축을 어떻게 할 수 있을까?)
// 

**1. 지역별 데이터 분류**

```javascript
export function classifyData(data: IFoodInfo[]): Promise<IFoodInfos> {
    return new Promise((resolve, reject) => {
    let temp_arr : IFoodInfos = {
      중구: [],
      남구: [],
      동구: [],
      서구: [],
      북구: [],
      달서구: [],
      달성군: [],
      수성구: [],
    };
    data.forEach((value)=>{
      temp_arr[value.시군구].push(value);
    })
    resolve(temp_arr);
  });
}
```
불필요하게 쓰인 switch 문을 제거함으로 가독성을 높였다.
불필요하게 할당된 배열을 줄여서 메모리 효율성을 높였다.

![image](https://user-images.githubusercontent.com/34260967/158298805-6031f9dc-46fb-4ff3-a3a3-bae8e6e90f56.png)

데이터 분류 경과시간이 약 3-4 ms 걸린다. 코드를 변경하고 약 20%~30% 정도의 시간적 효율성이 증가했다. 하지만 실제론 굉장히 작은 차이이고, 네트워크를 통해 data를 받아오는 시간이 대부분이다. 따라서 data fetch 시간을 줄일 필요가 있다.

**2. 하나의 지역 데이터를 업소중심으로 가공**
```javascript
export const classifyDataInRes = (
  restaurantListInAlley: IFoodInfo[]
): Promise<IRestaurantListInAlley> => {
  return new Promise((resolve, reject) => {
    let temp: any = {};
    restaurantListInAlley.forEach((value: any) => {
      const restaurantIndex = value["업소 식별번호"];
      if (temp[restaurantIndex]) {
        // temp[restaurantIndex].menu = [   
        //   ...temp[restaurantIndex].menu,
        //   {
        //     menuName: value.메뉴명,
        //     cost: value["가격(원)"],
        //   },
        // ];
        temp[restaurantIndex].menu.push({ // 추가
          menuName: value.메뉴명,         // 추가
          cost: value["가격(원)"],        // 추가
        })                                // 추가
      } else {
        temp[restaurantIndex] = {
          restaurantName: value.업소명,
          alleyName: value.골목명,
          location: value.시군구,
          menu: [
            {
              menuName: value.메뉴명,
              cost: value["가격(원)"],
            },
          ],
        };
      }
    });
    resolve(temp);
  });
};
```

data를 순회하면서 menu 에 하나의 원소를 추가하는 내용이다. 이 때는 spread 표현을 사용하여 복사하는 것 보다 Array.push() 를 사용하여 원소를 추가하는것이 더 효율적이다.

![image](https://user-images.githubusercontent.com/34260967/158303096-250d42fa-067c-41fb-815e-c8ff550258df.png)

변경 전 : 순서대로 [79, 69, 63, 58, 51, 37, 19, 9] ms 의 시간이 걸렸다.
변경 후 : 순서대로 [14, 13, 13, 13, 14, 13, 9 ,8] ms 의 시간이 걸렸다.

굉장한 시간효율성의 상승을 보여준다. 데이터의 크기에 따라 최대 시간이 약 1/5 까지 줄어드는것을 볼 수 있다. 이 때, 가장 오른쪽에 위치한 데이터는 크기가 적다. 이를 보았을 때, 상황에 맞는 동작을 하는 것은 데이터가 많을 때 빛을 보는것을 알 수 있다.


**3. 골목별로 분류된 데이터를 업소별 데이터로 분류**
```javascript
function classifyDataInAlley(
  data: IRestaurantListInAlley,
  alleyName: string
): Promise<IRestaurant[]> {
  return new Promise((resolve, reject) => {
    // const arrayData: IRestaurant[] = [];

    //추가된 부분
    const temp : IRestaurant[] = Object.values(data).filter( (restaurantIndfo)=>{     
      if(restaurantIndfo.alleyName === alleyName){  
        return restaurantIndfo;
      } 
    })
    // Object.keys(data).forEach((restaurantIndex) => {
    //   arrayData.push(data[restaurantIndex]);
    // });
    // const temp = arrayData.filter((restaurantInfo: any) => {
    //   return restaurantInfo.alleyName === alleyName;
    // });
    resolve(temp);
  });
}
```
불필요한 메모리 할당과, 순회가 있어서 좀 더 간결하게 변경했다. 데이터의 크기가 작고, 변경 내용이 크지 않아서 큰 최적화는 이루지 못하였다.

![image](https://user-images.githubusercontent.com/34260967/158307290-056ed139-74d8-4649-821a-c2a297c1abfc.png)

경과시간은 185 ms 이다. 여러번 실행해 보았을때, 180 ~ 240 ms 까지 나오는 것을 볼 수 있었다. 따라서 큰 시간적 향상은 없다고 볼 수 있다.


## 요약

1. 공공데이터포털 OPEN API를 이용하여 대구에 있는 골목별 업소를 소개한다. 업소 데이터는 약 8만개이다.

2. 데이터 로딩 시간이 4~5초 정도 소요된다. 이를 줄이기 위해서 데이터 분류 함수의 최적화를 진행하였다. 결과적으로 개선된 시간적 향상은 다음과 같다.
    - 지역(군, 구)별 데이터 분류 : 20~30% 향상
    - 업소 중심 데이터셋 변경 : 최대 500% 향상(데이터가 많을 수록 높은 효율)
    - 업소메뉴 데이터를 하나의 오브젝트로 통합 : 동일 (데이터 수가 적음)

3. API를 호출하여 데이터를 받아오고 분류하는데 까지 시간이 약 4~5 초정도 걸린다.<BR>
=> 서버 사이드 렌더링의 필요성