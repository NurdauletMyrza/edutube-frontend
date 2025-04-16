import { useRouter } from "next/router";
import { Box } from "@mui/material";

const MyCourseViewPage = () => {
  const { query } = useRouter();
  const { courseId } = query;
  return <Box>{courseId}</Box>;
};

export default MyCourseViewPage;
