import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConversationService {
    private readonly API_URL = environment.apiUrl;
    private token: string;

    constructor() {
        // Get token from localstorage
        const getToken = async () => {
            const { value } = await Preferences.get({ key: 'token' });
            if (value) {
                this.token = value;
            }
        }; getToken()
    }

    // Create a group conversation
    public async createGroupConversation(type: 'group', usersIds: Array<string>, groupName: string, groupePictureUrl: string) {
        const options = {
            url: `${this.API_URL}/conversation/`,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            data: { type, usersIds, groupName, groupePictureUrl }
        };

        return await CapacitorHttp.post(options);
    }

    // Create a normal conversation
    public async createNormalConversation(type: 'normal', usersIds: Array<string>) {
        const options = {
            url: `${this.API_URL}/conversation/`,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            data: { type, usersIds }
        };

        return await CapacitorHttp.post(options);
    }

    // Ask code change email
    public async getConversationsForUser() {
        const options = {
            url: `${this.API_URL}/conversation/all`,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
        };

        return await CapacitorHttp.get(options);
    }
}
