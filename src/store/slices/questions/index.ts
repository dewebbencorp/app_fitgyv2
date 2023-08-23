import { createSlice } from "@reduxjs/toolkit";
import { Preguntas } from "../../../interfaces";

const surveyResponse: Preguntas = {
  id_pregunta: 0,
  detalle_pregunta: "",
};

export const surveyQuestion = createSlice({
  name: "question",
  initialState: surveyResponse,
  reducers: {
    setQuestion: (state, action) => {
      return action.payload;
    },
  },
});

export const { setQuestion } = surveyQuestion.actions;
export default surveyQuestion.reducer;
