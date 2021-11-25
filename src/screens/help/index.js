/**
 ** Name: Help screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import { Layout, Menu, MenuGroup, MenuItem, Icon, Text } from '@ui-kitten/components';
import {Image} from 'react-native';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import { cStyles } from '~/utils/style';
import { sW } from '~/utils/helper';
import Assets from '~/utils/asset/Assets';
/* COMMON */

/* REDUX */

const RenderQuestionIcon = (props) => (
  <Icon {...props} name='question-mark-outline'/>
);

function Help(props) {
  const {navigation} = props;

  /** Use state */
  const [loading, setLoading] = useState(true);
  const [selectedQuest, setSelectedQuest] = useState(-1);
  const [quests, setQuests] = useState([]);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleSelectQuest = idxQuest => {
    setSelectedQuest(idxQuest);
  };

  /**********
   ** FUNC **
   **********/

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    let tmpQuests = [
      {
        idGroup: 'group1',
        titleGroup: 'What is Lorem Ipsum?',
        quests: [
          {
            idItem: 'item11',
            titleItem: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry?'
          },
          {
            idItem: 'item12',
            titleItem: 'when an unknown printer took a galley of type and scrambled it to make a type specimen book?'
          }
        ]
      },
      {
        idGroup: 'group2',
        titleGroup: 'Where does it come from?',
        quests: [
          {
            idItem: 'item21',
            titleItem: 'Contrary to popular belief, Lorem Ipsum is not simply random text?'
          },
          {
            idItem: 'item22',
            titleItem: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested?'
          }
        ]
      },
      {
        idGroup: 'group3',
        titleGroup: 'Where can I get some?',
        quests: [
          {
            idItem: 'item31',
            titleItem: 'There are many variations of passages of Lorem Ipsum available?'
          },
          {
            idItem: 'item32',
            titleItem: 'It uses a dictionary of over 200 Latin words, combined with a handful of model?'
          }
        ]
      },
    ];
    setQuests(tmpQuests);
    setLoading(false)
  }, []);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top']}
      padder
      headerComponent={<CTopNavigation title={'help:title'} back />}>
      <Layout style={[cStyles.center, cStyles.my24]} level={'2'}>
        <Image
          style={{height: sW('50%'), width: sW('50%')}}
          resizeMode={'contain'}
          source={Assets.imgHelp}
        />
      </Layout>
      
      <Layout level={'1'}>
        {!loading && (
          <Menu
            selectedIndex={selectedQuest}
            onSelect={handleSelectQuest}>
            {quests.length > 0 &&  quests.map((item, index) => {
              return (
                <MenuGroup key={item.idGroup} title={item.titleGroup} accessoryLeft={RenderQuestionIcon}>
                  {item.quests.map((item1, index1) => {
                    return (
                      <MenuItem
                        key={item1.idItem}
                        title={evaProps => 
                          <Text style={cStyles.flex1} category={'p1'}>{item1.titleItem}</Text>
                        }
                        accessoryLeft={RenderQuestionIcon} />
                    )
                  })}
                </MenuGroup>
              )
            })}
          </Menu>
        )}
      </Layout>
    </CContainer>
  );
}

export default Help;
