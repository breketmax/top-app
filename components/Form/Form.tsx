import { FormProps } from "./Form.props";
import styles from "./Form.module.scss";
import cn from "classnames";
import { Button, Input, Rating, Textarea } from "..";
import { useState } from "react";
import CloseIcon from "./closeForm.svg";
import { useForm,Controller } from "react-hook-form";
import { IForm, IResponse } from "./IForm.interface";
import axios from "axios";
import { API } from "../../helpers/api";


export const Form = ({productId,className,...props}:FormProps):JSX.Element => {
  const { control,handleSubmit, formState: {errors},reset } = useForm<IForm>();
  const [isSuccess,setIsSuccess] = useState<boolean>(false);
  const [isError,setIsError]= useState<boolean>(false);

  const formSubmit = async (formData:IForm) => {
    try{
      const { data } = await axios.post<IResponse>(API.review.createDemo,{...formData,productId});
      if(data.message){
        setIsSuccess(true);
        setIsError(false);
        reset();
      }
      else{
        setIsSuccess(false);
        setIsError(true);
      }
    }
    catch{
      setIsSuccess(false);
      setIsError(true);
    }   
  };
  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className={cn(className,styles.form)} {...props}>
        <Controller 
          control={control}
          name="name"
          rules={{required:{value:true, message:"Введите имя"}}}
          render={({field}) => (<Input error={errors.name} ref={field.ref} onChange={field.onChange} placeholder="Имя"/>)}
        />
        <Controller 
          control={control}
          name="title"
          rules={{required:{value:true, message:"Введите заголовок"}}}
          render={({field}) => (<Input className={styles.title} error={errors.title} ref={field.ref} onChange={field.onChange} placeholder="Заголовок отзыва"/>)}
        />
        <div className={styles.rating}>
          Оценка: 
          <Controller 
            control={control}
            name="rating"
            rules={{required:{value:true, message:"Укажите оценку"}}}
            render={({field})=> (<Rating error={errors.rating} rating={field.value} ref={field.ref} isEditable setRating={field.onChange}/>)}         
          />
        </div>
        <Controller 
          control={control}
          name="description"
          rules={{required:{value:true, message:"Введите описание"}}}
          render={({field}) => (<Textarea error={errors.description} ref={field.ref} onChange={field.onChange} className={styles.description} placeholder="Текст отзыва"/>)}
        />
        
        <div className={styles.formFooter}>
          <Button type="submit" appearance="primary" arrow="none">Отправить</Button>
          <span>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
        {isSuccess && <div className={styles.succes}>
          <b>Ваш отзыв отправлен</b>
          <br />Спасибо ваш отзыв будет опубликован но это не точно.
          <CloseIcon onClick={() => setIsSuccess(false)}/>
        </div>}
        {isError && <div className={styles.error}>
          <b>Ошибка :(</b>
          <br />Что-то пошло вообще не так как надо, попробуйте страницу перезагрузить...
          <CloseIcon onClick={() => setIsError(false)}/>
        </div>}
      </div>
    </form>
  );
};