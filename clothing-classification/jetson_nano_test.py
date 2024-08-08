import subprocess

# 1. COCO 포맷으로 변환
def convert_images_to_coco(images_path, classes_file, output_json):
    command = [
        'python', 'tools/dataset_converters/images2coco.py',
        images_path, classes_file, output_json
    ]
    try:
        subprocess.run(command, check=True)
        print("============= coco dataset annotation 생성 ================")
    except subprocess.CalledProcessError as e:
        print(f"Error: {e.stderr.decode()}")

# 2. 모델 테스트 실행
def run_model_test(config_file, checkpoint_file, output_pkl, work_dir, show_dir):
    command = [
        'python', 'tools/test.py',
        config_file, checkpoint_file,
        '--out', output_pkl,
        '--work-dir', work_dir,
        '--show-dir', show_dir
    ]
    try:
        subprocess.run(command, check=True, stderr=subprocess.PIPE)
        print("============= 테스트 완료!! ================")
    except subprocess.CalledProcessError as e:
        print(f"Error: {e.stderr.decode()}")

if __name__ == "__main__":
    # 1단계: COCO 포맷으로 변환
    images_path = 'data/test/images'
    classes_file = 'classes.txt'
    output_json = 'test.json'
    
    convert_images_to_coco(images_path, classes_file, output_json)
    
    # 2단계: 모델 테스트 실행
    config_file = 'configs/clothes/mask-rcnn_r50_fpn_1x_clothes.py'
    checkpoint_file = 'work_dirs/mask-rcnn_r50_fpn_1x_clothes/epoch_1.pth'
    output_pkl = 'results/results.pkl'
    work_dir = 'results/work_dirs'
    show_dir = str('')
    
    run_model_test(config_file, checkpoint_file, output_pkl, work_dir, show_dir)