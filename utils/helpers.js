import React from 'react';
import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';

import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'MobileFlashcard:notifications';
const CHANNEL_ID = 'DailyReminder';

function createNotification() {
  return {
    title: 'Reminder to study',
    body: "👋Please, Don't forget to study for today! Good Luck!",
    android: {
      channelId: CHANNEL_ID,
      color: 'red',
      sticky: false,
    }
  };
}

export function clearNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

export function setNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.createChannelAndroidAsync(CHANNEL_ID, createChannel())
              .then(val => console.log('channel return:', val))
              .then(() => {
                Notifications.cancelAllScheduledNotificationsAsync();

                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(20);
                tomorrow.setMinutes(0);

                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day'
                  }
                );

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
              })
              .catch(err => {
                console.log('err', err);
              });
          }
        });
      }
    });
}

function createChannel() {
  return {
    name: 'Daily Reminder',
    description: 'This is a daily reminder for you to study, Good Luck',
    priority: 'high',
    sound: true,
  };
}
