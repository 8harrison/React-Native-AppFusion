import { View, Text, StyleSheet, Modal, TextInput } from 'react-native';
import { useState, useContext } from 'react';
import { ContextValue } from '../context/ContextValue';
import OptionList from './OptionList';
import CustomButton from './CustomButton';
import { verificaInputs } from '../utils';
import { salvaFazendo, removeModelo } from '../connection';

export default function ModalView() {
  const { modalVisible, setModalVisible, modelo } = useContext(ContextValue);
  const [acessorios, setAcessorios] = useState({
    cor: '',
    cambio: '',
    arCondicionado: '',
    vidroEletrico: '',
    nPortas: '',
  });
  const [quantidade, setQuantidade] = useState('');

  const resetarInputs = () => {
    setAcessorios({
      cor: '',
      cambio: '',
      arCondicionado: '',
      vidroEletrico: '',
      nPortas: '',
    });
    setQuantidade('');
  };

  const opcoes = {
    sOuN: ['Sim', 'Não'],
    nPortas: [2, 4],
    cores: ['Branco', 'Preto', 'Vermelho', 'Azul', 'Verde'],
    cambio: ['Manual', 'Automático'],
  };

  const excluirModelo = async () => {
    removeModelo(modelo.key);
    setModalVisible(false);
  };

  const iniciar = async () => {
    const liberar = verificaInputs(acessorios);
    if (liberar && quantidade) {
      salvaFazendo({ acessorios, quantidade }, modelo.key);
    } else {
      alert('HOJE NÃO, AMIGO!');
    }
    setModalVisible(false);
    resetarInputs();
  };

  const changeInput = (item, field) =>
    setAcessorios({ ...acessorios, [field]: item });

  const voltar = () => {
    setModalVisible(false);
    resetarInputs();
  };

  const optionListItens = [
    {
      title: 'COR',
      value: acessorios.cor,
      setValue: (v) => changeInput(v, 'cor'),
      opcoes: opcoes.cores,
    },
    {
      title: 'CAMBIO',
      value: acessorios.cambio,
      setValue: (v) => changeInput(v, 'cambio'),
      opcoes: opcoes.cambio,
    },
    {
      title: 'AR-CONDICIONADO',
      value: acessorios.arCondicionado,
      setValue: (v) => changeInput(v, 'arCondicionado'),
      opcoes: opcoes.sOuN,
    },
    {
      title: 'VIDRO ELÉTRICO',
      value: acessorios.vidroEletrico,
      setValue: (v) => changeInput(v, 'vidroEletrico'),
      opcoes: opcoes.sOuN,
    },
    {
      title: 'Nº PORTAS',
      value: acessorios.nPortas,
      setValue: (v) => changeInput(v, 'nPortas'),
      opcoes: opcoes.nPortas,
    },
  ];

  return (
    <Modal visible={modalVisible} transparent onRequestClose={voltar}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>ADICIONAR</Text>

        {optionListItens.map((item) => (
          <OptionList
            style={styles.modalInput}
            title={item.title}
            opcoes={item.opcoes}
            value={item.value}
            setValue={item.setValue}
          />
        ))}

        <TextInput
          keyboardType="decimal-pad"
          style={styles.modalInput}
          placeholder="QUANTIDADE"
          value={quantidade}
          onChangeText={(v) => setQuantidade(parseInt(v))}
        />
        <CustomButton
          title="INICIAR PRODUÇÃO"
          style={styles.modalBtn}
          textStyle={styles.modalTxtBtn}
          action={iniciar}
        />
        <CustomButton
          title="EXCLUIR MODELO"
          style={[styles.modalBtn, styles.modalRedBtn]}
          textStyle={styles.modalTxtBtn}
          action={excluirModelo}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    padding: 35,
    margin: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 150,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    width: '100%',
    borderRadius: 10,
    marginBottom: 5,
    padding: 5,
    paddingStart: 10,
  },
  modalBtn: {
    backgroundColor: 'black',
    width: '100%',
    borderRadius: 20,
    paddingVertical: 8,
    marginTop: 10,
  },
  modalTxtBtn: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  modalRedBtn: {
    backgroundColor: 'red',
  },
});
