import React, { FC, memo, useCallback, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import HeaderMenu from '../../components/Header/Menu';
import Search from '../../components/UI/Search/Search';
import { Button } from '@mui/material';
import { HeaderBox } from './Header.styled';
import { IoMenu, IoFlameSharp } from 'react-icons/io5';
import { IAppSetMenu } from '../../store/reducers/appReducer/types';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AppSetMenu } from '../../store/reducers/appReducer/actions';
import Auth from '../Auth/Auth';

const Header: FC<{
  toggleMenu: () => IAppSetMenu;
  isAuth: boolean;
}> = memo(({ toggleMenu, isAuth }) => {
  const [modalAuth, setModalAuth] = useState(false);
  return (
    <>
      <HeaderBox>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='open drawer'
              sx={{ mr: 2 }}
              onClick={toggleMenu}
            >
              <IoMenu />
            </IconButton>
            <Box
              sx={{
                display: {
                  xs: 'none',
                  sm: 'flex',
                },
                alignItems: 'center',
              }}
            >
              <Typography variant='h5' component='div' noWrap>
                VIBE
              </Typography>
              <IoFlameSharp size={24} color='#DA4A5E' />
            </Box>
            <Search />
            <Button variant='contained' color='secondary'>
              Новая Запись
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <HeaderMenu
              isAuth={isAuth}
              openModal={() => () => setModalAuth(true)}
            />
          </Toolbar>
        </AppBar>
      </HeaderBox>
      <Auth isOpen={modalAuth} closeModal={() => () => setModalAuth(false)} />
    </>
  );
});

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const ActionToggleMenu = useCallback(() => dispatch(AppSetMenu()), []);
  const isAuth = useTypedSelector((state) => state.authReducer.isAuth);

  return <Header toggleMenu={ActionToggleMenu} isAuth={isAuth} />;
};

export default HeaderContainer;
