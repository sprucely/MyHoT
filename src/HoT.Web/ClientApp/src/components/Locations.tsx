import React, { useEffect } from 'react';
import { useState } from '@hookstate/core'

import { TagLookup } from './TagLookup';
import { LocationFilterModel, LocationModel, TagModel } from '../types';
import { Grid, List } from 'semantic-ui-react';
import { LocationTree } from './LocationTree';
import Axios from 'axios';

export const Locations = () => {
  const locationFilter = useState<LocationFilterModel>({ parentId: null });

  const searchLocationsAsync = async () => {
    const result = await Axios.post<LocationModel[]>("/api/locations/search", locationFilter.get());
    return result.data || [];
  }

  const locations = useState<LocationModel[]>([]);

  const handleTagsChanged = (newTags: TagModel[]) => {
    locationFilter.tagFilter.merge({ tags: newTags, includeAllTags: true });
  };


  useEffect(() => {
    locations.set(searchLocationsAsync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationFilter]);

  return (
    <div>
      <Grid columns={2} divided stackable>
        <Grid.Row>
          <Grid.Column>
            <TagLookup onTagsChanged={handleTagsChanged} />
            <LocationTree
              locations={locations}
              locationFilter={locationFilter}
            />
          </Grid.Column>
          <Grid.Column>
            <List divided relaxed>
              <List.Item>
                <List.Icon name='github' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
                  <List.Description as='a'>Updated 10 mins ago</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='github' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>Semantic-Org/Semantic-UI-Docs</List.Header>
                  <List.Description as='a'>Updated 22 mins ago</List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='github' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
                  <List.Description as='a'>Updated 34 mins ago</List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <div>
        Icons generated by <a href="https://www.flaticon.com">flaticon.com</a>. <p>Under <a href="http://creativecommons.org/licenses/by/3.0/">CC</a>: <a data-file="014-stairs" href="http://www.freepik.com">Freepik</a>, <a data-file="005-bin" href="https://www.flaticon.com/authors/smashicons">Smashicons</a>, <a data-file="011-box" href="https://www.flaticon.com/authors/pixel-perfect">Pixel perfect</a></p>
      </div>
    </div>
  );
}
