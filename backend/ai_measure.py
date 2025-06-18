import cv2
import numpy as np
import mediapipe as mp
from PIL import Image
import io

HAND_LENGTH_CM = 18.0  # average human hand length

mp_hands = mp.solutions.hands

def estimate_plant_length(image_bytes):
    # Convert image bytes to OpenCV image
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    np_image = np.array(image)
    np_image = cv2.cvtColor(np_image, cv2.COLOR_RGB2BGR)

    # Detect hand
    with mp_hands.Hands(static_image_mode=True, max_num_hands=2) as hands:
        results = hands.process(cv2.cvtColor(np_image, cv2.COLOR_BGR2RGB))

        if not results.multi_hand_landmarks:
            return {"error": "No hand detected"}

        landmarks = results.multi_hand_landmarks[0].landmark
        h, w, _ = np_image.shape
        xs = [int(l.x * w) for l in landmarks]
        ys = [int(l.y * h) for l in landmarks]
        hand_height_px = max(ys) - min(ys)

        if hand_height_px <= 0:
            return {"error": "Invalid hand detection"}

        px_per_cm = hand_height_px / HAND_LENGTH_CM

    # Detect plant via green color
    hsv = cv2.cvtColor(np_image, cv2.COLOR_BGR2HSV)
    lower_green = np.array([30, 40, 40])
    upper_green = np.array([90, 255, 255])
    mask = cv2.inRange(hsv, lower_green, upper_green)

    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not contours:
        return {"error": "No plant detected"}

    largest_contour = max(contours, key=cv2.contourArea)
    _, _, _, h_box = cv2.boundingRect(largest_contour)

    plant_length_cm = round(h_box / px_per_cm, 2)

    return {
        "plant_length_cm": plant_length_cm,
        "scale_cm_per_px": round(1 / px_per_cm, 4)
    }
