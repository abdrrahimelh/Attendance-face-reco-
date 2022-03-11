import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime
import datetime
import time
import boto3
import pymongo
import ssl

#Connecting to mongo db and AWS
client = pymongo.MongoClient("secret",ssl_cert_reqs=ssl.CERT_NONE)
db = client.attendance
mycol=db["attendance"]
access='secret'
secret='secret'
s3 = boto3.client('s3',aws_access_key_id=access,aws_secret_access_key=secret)
print("All connection are established")
#end 

path = 'D:/pp/1/Face-Recognition-Attendance-Projects/Training_images'
images = []
classNames = []
myList = os.listdir(path)
print(myList)

pers=["Abdrrahim","Hamza","Abdessalam","Mohcine"]
obj={}
for n in pers:
    obj[n]=0
for cl in myList:
    curImg = cv2.imread(f'{path}/{cl}')
    images.append(curImg)
    classNames.append(os.path.splitext(cl)[0])
print(classNames)


def findEncodings(images):
    encodeList = []


    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
    return encodeList




#### FOR CAPTURING SCREEN RATHER THAN WEBCAM
# def captureScreen(bbox=(300,300,690+300,530+300)):
#     capScr = np.array(ImageGrab.grab(bbox))
#     capScr = cv2.cvtColor(capScr, cv2.COLOR_RGB2BGR)
#     return capScr

encodeListKnown = findEncodings(images)
print('Encoding Complete')

cap = cv2.VideoCapture(0)
P=[]
i=0
K=True
now=datetime.datetime.now()
stringdayurl=str(now)[:10]
stringday=str(now)[:10]
L=[]
with open('D:/pp/1/Face-Recognition-Attendance-Projects/seance.txt') as counting:
    lines = counting.readlines()
seance=int(lines[0])
start=0
Alr=True
while True:
    i+=1
    success, img = cap.read()
    if (Alr):
        start = time.time()
        Alr=False
# img = captureScreen()
    imgS = cv2.resize(img, (0, 0), None, 0.25, 0.25)
    imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)
    facesCurFrame = face_recognition.face_locations(imgS)
    encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)
    for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
        matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
        faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)
# print(faceDis)
        matchIndex = np.argmin(faceDis)
        if matches[matchIndex]:
            name = classNames[matchIndex]
            obj[name]+=1            
            if ((name not  in P) and obj[name]>5):
                print(name+" est présent")
                pa='D:/pp/1/Face-Recognition-Attendance-Projects/Images/'+stringdayurl+str(seance)+name+".png"
                cv2.imwrite(pa,img)
                P.append(name)
                with open(pa, "rb") as f:
                    s3b=stringdayurl+str(seance)+name+".png"
                    s3.upload_fileobj(f, "pppattendance", s3b)
                print("match")
            end = time.time()
            absents=["Abdrrahim","Hamza","Abdessalam","Mohcine"]
            if ((int(end - start)<=50) and (K)) :
                if (int(end - start)>=40):
                    print("in")
                    K=False
                    for n in absents:
                        if (n in P):
                            L.append({'nom':n,'attendance':True,'image':"https://pppattendance.s3.eu-west-3.amazonaws.com/"+stringdayurl+str(seance)+n+'.png'})
                        else:
                            L.append({'nom':n,'attendance':False,'image':''})
                    test={'day':stringday,'séance':seance,'data':L}
                    xx = mycol.insert_one(test)
                    print("sent: ")
                    print(test)


# print(name)
            y1, x2, y2, x1 = faceLoc
            y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
            if ((name not  in P)):
                cv2.rectangle(img, (x1, y1), (x2, y2), (0, 0, 255), 2)
                cv2.rectangle(img, (x1, y2 - 35), (x2, y2), (0, 0, 255), cv2.FILLED)
            else :
                cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.rectangle(img, (x1, y2 - 35), (x2, y2), (0, 255, 0), cv2.FILLED)             
            cv2.putText(img, name, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)

    cv2.imshow('Webcam', img)
    cv2.waitKey(1)
 
