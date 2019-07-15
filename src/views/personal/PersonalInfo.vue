<template>
  <v-card>
    <v-tabs
      v-model="active"
      color="#F8F9FA"
      dark
      slider-color="red"
      @change="handleTabsChange"
    >
      <v-tab style="width: 150px; color: black" ripple>基本信息</v-tab>
      <v-tab style="width: 150px; color: black" ripple>账户信息</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text style="margin-left: 30px">
            <Information :user="user" />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <CList :card-list="cardList" />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import Information from "../../components/main/Information";
import CList from "../../components/main/CList";
export default {
  name: "PersonalInfo",
  components: { CList, Information },
  data() {
    return {
      active: null,
      first: 0,
      user: {
        id: 1,
        mail: "Leafqun@yeah.net",
        sex: 0,
        nickname: "Leafqun",
        phone: 12345677,
        birthdate: "2019-07-13"
      },
      cardList: [
        {
          id: 1,
          place: "杭州",
          type: 0,
          cardNum: "621226717321452345",
          currency: "人民币",
          money: 100.0,
          availableMoney: 100.0
        },
        {
          id: 2,
          place: "杭州",
          type: 1,
          cardNum: "621226717321452346",
          currency: "人民币",
          money: 100.0,
          availableMoney: 100.0
        }
      ]
    };
  },
  created() {
    this.getGood();
  },
  methods: {
    async getGood() {
      const { data } = await this.$axios.get(`${this.$userUrl}/selectByID`, {
        params: { id: this.$store.state.user.id }
      });
      this.user = data.user;
    },
    async getCardList() {
      const { data } = await this.$axios.get(
        `${this.$userUrl}/getCardListByUserId`,
        {
          params: { userid: this.$store.state.user.id }
        }
      );
      this.cardList = data.cardList;
    },
    handleTabsChange(page) {
      if (this.first === 0) {
        this.getCardList();
      }
      this.first++;
      this.active = page;
    }
  }
};
</script>

<style scoped></style>
