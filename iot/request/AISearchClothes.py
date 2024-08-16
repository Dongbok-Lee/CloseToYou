import requests
import os
from dotenv import load_dotenv

class CompletionExecutor:
    def __init__(self, host, api_key, api_key_primary_val, request_id):
        self._host = host
        self._api_key = api_key
        self._api_key_primary_val = api_key_primary_val
        self._request_id = request_id

    def execute(self, completion_request):
        headers = {
            'X-NCP-CLOVASTUDIO-API-KEY': self._api_key,
            'X-NCP-APIGW-API-KEY': self._api_key_primary_val,
            'X-NCP-CLOVASTUDIO-REQUEST-ID': self._request_id,
            'Content-Type': 'application/json; charset=utf-8',
            # 'Accept': 'text/event-stream'
        }

        with requests.post(self._host + '/testapp/v1/chat-completions/HCX-003',
                           headers=headers, json=completion_request, stream=True) as r:

            data = r.json().get('result').get("message").get('content')
            return data


def request_find_clothes(question):
    load_dotenv('/home/orin/S11P12B201/iot/env/data.env')
    completion_executor = CompletionExecutor(
        host=os.getenv('aihost'),
        api_key=os.getenv('api_key'),
        api_key_primary_val=os.getenv('api_key_primary_val'),
        request_id=os.getenv('request_id')
    )

    preset_text = [{"role":"system","content":""},{"role":"user","content":question}]

    request_data = {
        'messages': preset_text,
        'topP': 0.8,
        'topK': 0,
        'maxTokens': 256,
        'temperature': 0.5,
        'repeatPenalty': 5.0,
        'stopBefore': [],
        'includeAiFilters': True,
        'seed': 1 
    }

    print(preset_text)
    return completion_executor.execute(request_data)

# data = "[{'clothes_id': 1, 'nickname': '빨간 티셔츠', 'type': '티셔츠', 'location': 'a4', 'pattern': '없음', 'color': '빨강'}, {'clothes_id': 2, 'nickname': '이쁜이', 'type': '코트', 'location': 'a3', 'pattern': '없음', 'color': '파랑'}, {'clothes_id': 3, 'nickname': '노랑 티셔츠', 'type': '티셔츠', 'location': 'a2', 'pattern': '없음', 'color': '노랑'}, {'clothes_id': 4, 'nickname': '이동복', 'type': '바지', 'location': 'a2', 'pattern': '없음', 'color': '하양'}] 상의의 위치만 단독으로 출력해줘"
