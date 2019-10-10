import { observable, action, runInAction } from "mobx";
import axios from "axios";
import { BASE_URL, TOKEN } from "./constants";

class Tickets {
  @observable ticket = {};
  @observable.shallow tickets = [];
  @observable status = '';
  @observable error = '';
  @observable openAdd = false;

  constructor () {
    this.listTickets();
  }

  @action.bound
  async listTickets () {
    try {
      this.status = 'pending';
      const result = await axios.get(`${BASE_URL}/api/tickets/`, {
        headers: {'Authorization': `Bearer ${TOKEN}`}
      });

      if (result.status === 200) {
        runInAction(() => {
          this.tickets = result.data;
          this.status = 'completed';
        });
      }
    } catch (e) {
      runInAction(() => this.status = 'failed');
    }
  }

  @action.bound
  async addTicket (ticket) {
    try {
      this.status = 'pending';
      this.error = '';
      const result = await axios.post(`${BASE_URL}/api/tickets/`, ticket, {
        headers: {'Authorization': `Bearer ${TOKEN}`}
      });

      if (result.status === 201) {
        runInAction(() => {
          this.listTickets();
          this.openCloseAdd();
        });
      }
    } catch (e) {
      runInAction(() => {
        this.status = 'failed';
        this.error = e.message
      });

    }
  }

  @action.bound
  async openCloseAdd () {
    this.error = '';
    this.ticket = {};
    this.openAdd = !this.openAdd;
  }

  @action.bound
  async closeError () {
    this.error = '';
  }
}

export const store = new Tickets();