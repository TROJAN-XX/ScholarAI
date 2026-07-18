import { useFormContext } from "react-hook-form";

import { Button } from "../../common";

const SubmitSection = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-80">
        <Button
          type="submit"
          loading={isSubmitting}
        >
          Generate AI Recommendations
        </Button>
      </div>
    </div>
  );
};

export default SubmitSection;