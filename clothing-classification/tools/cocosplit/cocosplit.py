import json
import argparse
import funcy
from sklearn.model_selection import train_test_split
from skmultilearn.model_selection import iterative_train_test_split
import numpy as np
import os

def save_coco(file, images, annotations, categories):
    with open(file, 'wt', encoding='UTF-8') as coco:
        json.dump({'images': images, 
            'annotations': annotations, 'categories': categories}, coco, indent=2, sort_keys=True)
    print(f"파일 {file} 저장 완료")

def filter_annotations(annotations, images):
    image_ids = funcy.lmap(lambda i: int(i['id']), images)
    return funcy.lfilter(lambda a: int(a['image_id']) in image_ids, annotations)

def filter_images(images, annotations):
    annotation_ids = funcy.lmap(lambda i: int(i['image_id']), annotations)
    return funcy.lfilter(lambda a: int(a['id']) in annotation_ids, images)

parser = argparse.ArgumentParser(description='Splits COCO annotations file into training and test sets.')
parser.add_argument('annotations', metavar='coco_annotations', type=str,
                    help='Path to COCO annotations file.')
parser.add_argument('train', type=str, help='Where to store COCO training annotations')
parser.add_argument('test', type=str, help='Where to store COCO test annotations')
parser.add_argument('-s', dest='split', type=float, required=True,
                    help="A percentage of a split; a number in (0, 1)")
parser.add_argument('--having-annotations', dest='having_annotations', action='store_true',
                    help='Ignore all images without annotations. Keep only these with at least one annotation')

parser.add_argument('--multi-class', dest='multi_class', action='store_true',
                    help='Split a multi-class dataset while preserving class distributions in train and test sets')

args = parser.parse_args()

def main(args):

    print("COCO 어노테이션 파일 로드 중...")
    with open(args.annotations, 'rt', encoding='UTF-8') as annotations:
        coco = json.load(annotations)
        images = coco['images']
        annotations = coco['annotations']
        categories = coco['categories']
        print(f"총 {len(images)}개의 이미지와 {len(annotations)}개의 어노테이션 로드 완료.")

        # 어노테이션이 없는 이미지를 제외
        if args.having_annotations:
            print("어노테이션이 없는 이미지를 제외하는 중...")
            images_with_annotations = funcy.lmap(lambda a: int(a['image_id']), annotations)
            images = funcy.lremove(lambda i: i['id'] not in images_with_annotations, images)
            print(f"어노테이션이 있는 {len(images)}개의 이미지만 유지.")

        # 이미지가 없는 어노테이션을 제외
        print("이미지가 없는 어노테이션을 제외하는 중...")
        annotations = filter_annotations(annotations, images)
        print(f"{len(annotations)}개의 유효한 어노테이션 유지.")
        
        # 임시로 COCO 어노테이션을 저장
        temp_save_path = '../data/saved_coco_annotations.json'
        save_coco(temp_save_path, images, annotations, categories)
        print(f"임시로 '{temp_save_path}'에 COCO 어노테이션 저장 완료.")
        
        if args.multi_class:
            print("멀티 클래스 데이터셋을 처리하는 중...")
            annotation_categories = funcy.lmap(lambda a: int(a['category_id']), annotations)

            # 클래스 당 하나의 샘플만 있는 경우 제거
            print("클래스 당 하나의 샘플만 있는 경우 제거 중...")
            annotation_categories =  funcy.lremove(lambda i: annotation_categories.count(i) <=1, annotation_categories)
            annotations = funcy.lremove(lambda i: i['category_id'] not in annotation_categories, annotations)
            print(f"{len(annotations)}개의 어노테이션 남음.")

            # 데이터셋 분리
            print("훈련 및 테스트 세트로 분리 중...")
            X_train, y_train, X_test, y_test = iterative_train_test_split(np.array([annotations]).T, np.array([annotation_categories]).T, test_size=1-args.split)
            print("분리 완료.")
            
            # COCO 파일 저장
            save_coco(args.train, filter_images(images, X_train.reshape(-1)), X_train.reshape(-1).tolist(), categories)
            save_coco(args.test, filter_images(images, X_test.reshape(-1)), X_test.reshape(-1).tolist(), categories)

            print(f"훈련 세트에 {len(X_train)}개, 테스트 세트에 {len(X_test)}개의 어노테이션 저장 완료.")
            
        else:
            print("데이터셋을 훈련 및 테스트 세트로 분리 중...")
            X_train, X_test = train_test_split(images, train_size=args.split)

            anns_train = filter_annotations(annotations, X_train)
            anns_test = filter_annotations(annotations, X_test)
            print("분리 완료.")
            
            # COCO 파일 저장
            save_coco(args.train, X_train, anns_train, categories)
            save_coco(args.test, X_test, anns_test, categories)

            print(f"훈련 세트에 {len(anns_train)}개, 테스트 세트에 {len(anns_test)}개의 어노테이션 저장 완료.")

if __name__ == "__main__":
     # GPU 허용
    os.environ["CUDA_DEVICE_ORDER"]="PCI_BUS_ID"
    os.environ["CUDA_VISIBLE_DEVICES"]="3"

    # CUDA 디버깅을 위해 환경 변수 설정
    os.environ['CUDA_LAUNCH_BLOCKING'] = "1"
    
    main(args)
