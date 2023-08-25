import React, {useEffect, useState} from "react";
import {
  Container,
  ModalWrapper,
  Header,
  Title,
  Content,
  Label,
  ToggleContainer,
  ButtonWrapper,
} from "./styles";
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';

// firebase imports
import { ref, getDatabase, get, update } from "firebase/database";

// import { UserAuth } from "../context/AuthContext";
import { useAuth } from "../../../../context/AuthContext";
interface ModalLvlProps{
  onClose: () => void;
  groupId: string;
}
const ModalLevelManagement: React.FC<ModalLvlProps> = ({onClose, groupId}) => {

  const [data, setData] = useState<{ [key: string]: boolean }>({});

  const handleSave = () => {

    const db = getDatabase();
    const profGRed = ref(db, `professors/${user?.uid}/groups/${groupId}/levels`);
    update(profGRed, data);

    onClose();
  };
  const handleClose = () => {
    console.log("HEYEH");
    onClose()
  };
  const handleChangeToggle = (key: any) => {
    setData(prevData => ({
      ...prevData,
      [key]: !prevData[key]
    }));
  };

  const {user} = useAuth();

  useEffect(() => {

    const db = getDatabase();
    const profGRed = ref(db, `professors/${user?.uid}/groups/${groupId}/levels`);
    get(profGRed).then((snapshot) => {
      const levelsObject = snapshot.val();
      setData(levelsObject);
    });

  }, []);

  return(
        <Container>
            <ModalWrapper>
                <Header>
                    <Title>
                        Control de Acceso
                    </Title>
                </Header>
                

                <Content>
                    <Label>
                        Configura el acceso a los niveles.
                    </Label>
                    <div>
                        {Object.keys(data).map(item => (
                          <ToggleContainer>
                            <Switch
                                checked={data[item]}
                                onChange={() => handleChangeToggle(item)}
                            /> 
                            <p>{item}</p>
                          </ToggleContainer>
                        ))}
                    </div>
                    <ButtonWrapper>
                        <Button variant="contained" color="success" onClick={handleSave}>Guardar</Button>
                        <Button variant="outlined" color="error" onClick={handleClose}>Cancelar</Button>
                    </ButtonWrapper>
                </Content>
            </ModalWrapper>
        </Container>
  );
  
};
export default ModalLevelManagement;
