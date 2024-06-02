# 🌊 제주어, 표준어 양방향 음성 번역 모델 생성 프로젝트

## 🎯 1. 프로젝트 소개
### 🧑‍🤝‍🧑 **팀원**
- **비타민 12기 : 구준회, 이서현, 이예린**
- **비타민 13기 : 김윤영, 김재겸, 이형석**

### 📅 **시기**
- **2024년 1학기**

### 🕹️ **주제**
- **제주 방언과 표준어 양방향 번역 모델 생성**

### 🎯 **목표**
- 제주 방언의 이해를 돕고, 제주 문화의 보존에 기여하고자 함
- 제주 지역도민과의 원활한 의사소통
- 제주 사투리와 한국어 표준어 사이를 연결하는 양방향 번역 모델을 개발
- 음성 인식 기능 및 인터페이스도 구현

## 📊 2. 데이터 수집
- **AI-Hub에서 수집한 데이터**
  - 한국어 방언 발화 데이터
  - 중·노년층 한국어 방언 데이터

- **Github에서 수집한 데이터**
  - 카카오 JIT 제주 방언 데이터

- **그 외 데이터**
  - 생활제주어 데이터 (제주어사전 웹페이지 크롤링)
  - 뭐랭하맨 데이터 (유튜버 뭐랭하맨 영상 중 가사 번역 영상 참고해 데이터 수집)
  - 제주방언 그 맛과 멋 데이터 (도서 '제주방언 그 맛과 멋'에서 데이터 수집)
  - 부에나도 지꺼져도 데이터 (도서 '부에나도 지꺼져도'에서 데이터 수집)

## 💻 3. 모델 학습
사전 학습된 모델을 불러 Fine-tuning을 진행해주었습니다.

번역 모델 개발을 위해 활용한 모델:
- gogamza/kobart-base-v2
  - SKT-AI 에서 제공
  - https://huggingface.co/gogamza/kobart-base-v2 (Hugging Face)
  - https://github.com/SKT-AI/KoBART (Github)

고려해봤지만 선택하지 않은 모델:
- T5 (시간이 오래 걸리는 문제가 있음)
- Jebert (성능이 별로 좋지 않았음)

## 📈 4. 주요 성과
- BLEU 점수
    - 제주어 -> 표준어 : 0.89
    - 표준어 -> 제주어 : 0.77
- 이 모델은 제주 사투리와 표준어 간의 양방향 번역에서 뛰어난 성능을 보였습니다.
<img src="Analysis_picture/넷마블_워드클라우드.png" alt="워드클라우드 시각화" width="600"/>

## 🔍 5. 향후 계획
모델 성능을 더욱 향상시키기 위해 추가 데이터 수집과 모델 파인 튜닝을 계획하고 있습니다.
인터페이스는 가볍게나마 만들었고 추후에 링크 첨부하겠습니다.
음성 BY 음성 기능도 구현 중입니다.

## 6. Etc..
데이터 출처
- 한국어 방언 발화 데이터 (AI-Hub 제공) : https://www.aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&aihubDataSe=data&dataSetSn=121
- 중·노년층 한국어 방언 데이터 (AI-Hub 제공) : https://www.aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&aihubDataSe=data&dataSetSn=71558
- 카카오 JIT 제주 방언 데이터 (카카오브레인 Github 참조) : https://github.com/kakaobrain/jejueo
- 생활제주어 데이터 (제주어사전 참조) : https://www.jeju.go.kr/culture/dialect/lifeDialect.htm
