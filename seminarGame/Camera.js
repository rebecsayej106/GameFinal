class Camera {
  constructor() {
    this.moved = false;
    this.video;
    this.bodyPose;
    this.poses = [];
    this.previousPositions = {}; // Store previous positions for specific body parts
    this.X = 0;
    this.Y = 0;
    this.name = 0;
  }

  preload() {
    this.bodyPose = ml5.bodyPose("MoveNet", { flipped: true });
  }

  setup() {
    this.video = createCapture(VIDEO, { flipped: true });
    this.video.size(800,480); // Set the size of the video

    this.video.hide();

    this.bodyPose.detectStart(this.video, this.gotPoses.bind(this));
  }

  gotPoses(results) {
    this.poses = results;
    console.log(this.poses);
  }

  setX(keypoint) {
    this.X = keypoint.x;
  }

  setY(keypoint) {
    this.Y = keypoint.y;
  }

  getX() {
    return this.X;
  }

  getY() {
    return this.Y;
  }

getName(){
  return this.lastKeypointName;
}
  getMessageForKeypoint() {
    let message;
    switch (this.lastKeypointName) {
        case "nose":
            message = 1;
            break;
        case "left_wrist":
            message = 2;
            break;
        case "right_wrist":
            message = 3;
            break;
        case "left_hip":
            message = 4;
            break;
        case "right_hip":
            message = 5;
            break;
        case "right_ankle":
            message = 6;
            break;
        case "left_ankle":
            message = 7;
            break;
        default:
            message = 0; 
          }
    return message;
}

detectMove(keypoint, previousPosition) {
    if (!previousPosition) return false;

    const distance = dist(keypoint.x, keypoint.y, previousPosition.x, previousPosition.y);
    return distance >15; 
}

draw() {
    image(this.video, 0, 0);

    if (this.poses.length > 0) {
        const pose = this.poses[0];

        for (const keypoint of pose.keypoints) {
            if (keypoint.confidence > 0.1) {
                const keypointName = keypoint.name;
                if (
                    [
                        "nose",
                        "left_wrist",
                        "right_wrist",
                        "left_hip",
                        "right_hip",
                        "right_ankle",
                        "left_ankle",
                    ].includes(keypointName)
                ) {
                    const previousPosition = this.previousPositions[keypointName];
                    const moved = this.detectMove(keypoint, previousPosition);

                    if (moved) {
                    
                        this.lastKeypointName = keypointName;
                        this.setX(keypoint);
                        this.setY(keypoint);
                        const message = this.getMessageForKeypoint(); 
                    }

                    // Update previous position for this keypoint
                    this.previousPositions[keypointName] = {
                        x: keypoint.x,
                        y: keypoint.y,
                    };
                }
            }
        }
    }
}
}

