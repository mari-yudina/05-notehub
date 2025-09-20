import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import css from "./NoteForm.module.css";
import { useId } from "react";
// Namespace import
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import type { CreateNoteRequest } from "../../types/note";

interface NoteFormOnCloseProps {
  onClose: () => void;
}

interface NoteFormProps {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

const defaultFormData: NoteFormProps = {
  title: "",
  content: "",
  tag: "Todo",
};

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "To long")
    .required("Title is required"),
  content: Yup.string().max(500, "To long"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Required filed"),
});

const NoteForm = ({ onClose }: NoteFormOnCloseProps) => {
  const fieldId = useId();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newNote: CreateNoteRequest) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  const handleSubmit = (
    values: NoteFormProps,
    formikHelpers: FormikHelpers<NoteFormProps>
  ) => {
    console.log("values", values);
    console.log("formikHelpers", formikHelpers);
    mutation.mutate(values);
    formikHelpers.resetForm();
  };

  return (
    <Formik
      initialValues={defaultFormData}
      onSubmit={handleSubmit}
      validationSchema={NoteFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id="title"
            type="text"
            name="title"
            className={css.input}
          />

          <ErrorMessage
            name="title"
            component="span"
            className={css.error}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />

          <ErrorMessage
            name="content"
            component="span"
            className={css.error}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id="tag"
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>

          <ErrorMessage
            name="tag"
            component="span"
            className={css.error}
          />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            //  disabled=false
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};
export default NoteForm;
