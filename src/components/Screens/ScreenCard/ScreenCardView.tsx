import React from 'react';
import { Tag } from 'antd';
import { green, red } from '@ant-design/colors';
import * as R from 'ramda';
import { Link } from 'react-router-dom';
import { PermissionType, ScreenTypes, Path } from 'types';

import { BottomContainer, Container, Icon, Inner, Title, TopContainer, } from './ScreenCardStyle';
import CardActions from './CardActions';

interface Props {
  screen: ScreenTypes.ScreenViewerRole;
}

const ScreenCard: React.FC<Props> = ({ screen }: Props) => {
  const { id, title, isActive, color, viewerRole } = screen;

  const isViewerAdmin = R.equals(viewerRole.permissionType, PermissionType.Admin);

  const handleActionsClick = (e: any) => (
    e.preventDefault()
  );

  const style = {
    backgroundColor: color,
  };

  const link = R.join('/', ['/studio', id]);

  return (
    <Link to={link}>
      <Container style={style}>
        <Icon icon="tv"/>
        <Inner>
          <TopContainer>
            <IsActive isActive={isActive}/>
          </TopContainer>
          <BottomContainer>
            <Title>
              {title}
            </Title>
            {isViewerAdmin && (
              <div onClick={handleActionsClick}>
                <CardActions screen={screen}/>
              </div>
            )}
          </BottomContainer>
        </Inner>
      </Container>
    </Link>
  );
};

const IsActive: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  R.cond<boolean, React.ReactElement>([
    [R.and(true), R.always(<Tag color={green[4]}>Aktywny</Tag>)],
    [R.T, R.always(<Tag color={red[4]}>Nieaktywny</Tag>)],
  ])(isActive)
);

export default ScreenCard;
