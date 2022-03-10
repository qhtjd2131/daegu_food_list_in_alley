# 대구 맛집 골목 소개 앱
공공데이터포털의 OPEN API를 활용하여 대구 내 골목에서 운영하는 업소 리스트 소개와 메뉴 소개입니다.


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

### 효율성을 생각하지 않고 결과만을 위한 분류
우선 결과물을 만들고 리팩토링해야겠다는 생각이 들었다. 그래서 일단 분류해보았다.

//데이터분류 함수 설명

![image](https://user-images.githubusercontent.com/34260967/157738285-063a6770-3b6f-430d-85de-80e3c8e7fec8.png)

실제 경과시간을 살펴보녀 약 4.3초 동안 Loading 상태에 있었다.

### 어떻게 효율적이게 만들 수 있을까?(시간단축을 어떻게 할 수 있을까?)
// 





API를 호출하여 데이터를 받아오고 분류하는데 까지 시간이 약 3-4초정도 걸린다.
데이터 분류 최적화를 진행하지 않음을 감안하더라도 긴 시간이다. 
=> 서버 사이드 렌더링의 필요성