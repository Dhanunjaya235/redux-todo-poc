import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  Heading,
  Center,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { successToast,errorToast } from '../toasters/toast-messages';
import { postdata } from '../axios/apicalls';
const initialFormData = {
  task: '',
  note: '',
  date: '',
  status: '',
  selected:0
};

const TodoForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const formBackground = useColorModeValue('gray.200', 'gray.700');
  const handleInputChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log(formData.status);
    if(formData.status!==''){
        let responce=await postdata('http://localhost:3000/todos',formData)
        if(responce.data){
          successToast("Todo Created Successfully")
        }
        setFormData(initialFormData);
    }
    else{
        errorToast("Choose Status")
    }
    
  };

  return (
    <Center style={{marginTop:"19%",width:"200%",marginLeft:"100%",}}>
        <form onSubmit={handleSubmit} style={{width:"100%"}}>
        <Flex alignItems="center" justifyContent="center">
        <Flex
                    flexDirection="column"
                    bg={formBackground}
                    p={4}
                    borderRadius={8}
                    width={400}
                    boxShadow="lg"
                >
                     <Heading>TodoForm</Heading>
      <FormControl mb={4}>
        <FormLabel>Task</FormLabel>
        <Input
          name="task"
          placeholder="Enter task"
          value={formData.task}
          onChange={handleInputChange}
          isRequired
        />
      </FormControl >
      <FormControl mb={4}>
        <FormLabel>Date</FormLabel>
        <Input type="date" min={new Date().toISOString().slice(0, 10)} name='date' value={formData.date} onChange={handleInputChange} isRequired />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Note</FormLabel>
        <Textarea
          name="note"
          placeholder="Enter note"
          value={formData.note}
          onChange={handleInputChange}
          isRequired
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>
            Select Status Of Your Todo
        </FormLabel>
        <Select onChange={handleInputChange} name="status" value={formData.status} isRequired>
            <option value=''>Status</option>
            <option value="Pending">Pending</option>
            <option value="InProgress">InProgress</option>
            <option value="Completed">Completed</option>
        </Select>
      </FormControl>
      <Button type='submit' colorScheme="teal" mb={8}>
                        Add Todo
                    </Button>
      </Flex>
      </Flex>
      </form>
    </Center>
  )
  }

export default TodoForm