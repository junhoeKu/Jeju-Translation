- train.csv : 기존 training, validation 폴더의 모든 데이터를 합치고 okt로 토큰화, 임베딩까지 마친 총 데이터

- df.csv / df.xlsx : training 폴더의 모든 데이터를 합치고 데이터프레임화 시킨 데이터

- df_val.csv / df_val.xlsx : validation 폴더의 모든 데이터를 합치고 데이터프레임화 시킨 데이터

- processed_df.csv : 충청/전라/제주 까지 있는 AI-Hub 데이터에서 제주도 발화 추가, 생활제주어 사전 어휘 추가 --> 약 1100000행 정도

- result_df.csv : processed_df에서 문장끼리 합쳐서 행 개수를 확 줄인 데이터 --> 약 280000행 정도

- 생활제주어.xlsx : 생활제주어 사전 문장들을 전처리한 데이터 --> 약 500행 정도 (Quality good)
