import {
  START_SELECTING,
  SELECT_CHAIR,
  CONFIRM_SELECTING,
} from "../types/chairType";

const DEFAULT_STATE = {
  name: "",
  seat: 0,
  selectedChairs: [], // [ {row, col} ]
  reservedChairs: [], // [ {name, seat, selectedChairs} ]
  isConfirmed: false,
};

// Mỗi reducer là 1 function
export const chairReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case START_SELECTING: {
      const { name, seat } = payload;
      state.name = name;
      state.seat = Number(seat);
      break;
    }
    case SELECT_CHAIR: {
      const { row, col } = payload;
      console.log(`Chọn hàng ${row}, Cột ${col}`);

      /**
      Lưu ý đối với mảng hoặc object nó sẽ ko tự thay đổi render lại ui
      Cho nên cần phải gán vô mọt object mới.
      Ví dụ
      const a = [];
      const b = [];
      => a khác b
      const c = a;
      thì c và a sẽ giống nhau vì dùng chung bộ nhớ
      nên nếu a thay đổi thì c cũng y chang
       */

      const chairs = [...state.selectedChairs];

      // Nếu đã chọn rồi thì gỡ ra, ngược lại thêm vào
      let found = false;
      for (let i = 0; i < chairs.length; i++) {
        let t_ = chairs[i];
        if (t_.row == row && t_.col == col) {
          // Gỡ ra
          chairs.splice(i, 1);
          found = true;
          break;
        }
      }

      if (!found) {
        // Thêm vô
        chairs.push({ row, col });
      }
      state.selectedChairs = chairs; // danh sách luôn được gán cho mảng mới hoàn toàn

      break;
    }
    case CONFIRM_SELECTING: {
      const chairs = [...state.reservedChairs];
      if (state.seat != state.selectedChairs.length) break;
      chairs.push({
        name: state.name,
        seat: state.seat,
        selectedChairs: state.selectedChairs,
      });
      state.reservedChairs = chairs;
      // Reset data sau khi confirm
      // state.name = "";
      // state.seat = 0;
      state.selectedChairs = [];
      state.isConfirmed = true;
      break;
    }
    default:
      break;
  }

  return { ...state };
};
