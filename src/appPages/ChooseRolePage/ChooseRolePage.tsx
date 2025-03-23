import { useRouter } from "next/router";
import {
  studentRole,
  teacherRole,
} from "../../../public/shared/utils/variables";
import { setUserRole } from "../../../public/shared/utils/services/usersAPI";

const ChooseRolePage = () => {
  const { push } = useRouter();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Выберите свою роль</h1>
      <button
        onClick={() => setUserRole(studentRole)}
        style={{ margin: "10px", padding: "10px" }}
      >
        Студент
      </button>
      <button
        onClick={() => setUserRole(teacherRole)}
        style={{ margin: "10px", padding: "10px" }}
      >
        Преподаватель
      </button>
    </div>
  );
};

export default ChooseRolePage;
