import ProjectService from "@/components/services/project-services/project-service/project-service";

const handleImageUpload = async (
  event: React.ChangeEvent<HTMLInputElement>,
  setImages: React.Dispatch<React.SetStateAction<string[]>>,
  projectService: ProjectService
) => {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    const imageElement = document.createElement("img");

    const reader = new FileReader();
    reader.onload = async (e) => {
      imageElement.src = e.target?.result as string;

      imageElement.onload = async () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        const MAX_DIMENSION = 400;

        let { width, height } = imageElement;
        if (width > height) {
          if (width > MAX_DIMENSION) {
            height = (MAX_DIMENSION / width) * height;
            width = MAX_DIMENSION;
          }
        } else {
          if (height > MAX_DIMENSION) {
            width = (MAX_DIMENSION / height) * width;
            height = MAX_DIMENSION;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(imageElement, 0, 0, width, height);

        const dataURL = canvas.toDataURL("image/png");

        // Upload the thumbnail and get the URL (simulating here)
        const thumbnail = await projectService.uploadThumbnailFromBase64(
          dataURL
        );

        if (thumbnail)
          setImages((prevImages: string[]) => [...prevImages, thumbnail]);
      };
    };
    reader.readAsDataURL(file);
  }
};

export default handleImageUpload;
