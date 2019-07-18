<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div style="margin-bottom: 30px;">
    <div style=" margin-top: 15px; margin-bottom: 40px; margin-left: 20px;">
      浙商卡包
    </div>
    <div style="margin-bottom: 40px;">
      <div v-for="(card, index) in cardList" :key="index">
        <div v-if="x > 800">
          <v-layout>
            <v-flex>
              <div class="line" style="text-align: center">
                <v-icon>fa fa-credit-card</v-icon>
              </div>
            </v-flex>
            <v-flex>
              <div class="line">
                <div>
                  <span>{{ card.city }}</span>
                  <span style="margin-left: 10px">{{
                    getType(card.type)
                  }}</span>
                </div>
                <div style="margin-top: 15px">{{ card.cardNum }}</div>
              </div>
            </v-flex>
            <v-flex>
              <div class="line">
                <div>币种</div>
                <div style="margin-top: 15px">{{ card.currency }}</div>
              </div>
            </v-flex>
            <v-flex>
              <div class="line">
                <div>
                  <span v-if="card.type === 2">额度</span>
                  <span v-else>余额</span>
                </div>
                <div style="margin-top: 15px">{{ card.money }}</div>
              </div>
            </v-flex>
            <v-flex>
              <div class="line">
                <div>
                  <span v-if="card.type === 2">可用额度</span>
                  <span v-else>可用余额</span>
                </div>
                <div style="margin-top: 15px">{{ card.availableMoney }}</div>
              </div>
            </v-flex>
          </v-layout>
          <v-divider
            style="margin: 30px 0"
            v-if="index < cardList.length - 1"
          />
        </div>

        <v-expansion-panel v-if="x <= 800">
          <v-expansion-panel-content>
            <template v-slot:header>
              <!-- 折叠板标题 -->
              <v-layout column>
                <v-layout align-center justify-start row fill-height>
                  <div>
                    <v-icon>fa fa-credit-card</v-icon>
                  </div>
                  <div style="margin-left: 15px;">
                    <span>{{ card.place }}</span>
                    <span style="margin-left: 10px">{{
                      getType(card.type)
                    }}</span>
                  </div>
                </v-layout>

                <div class="line">
                  <div style="margin-top: 15px">卡号：{{ card.cardNum }}</div>
                </div>
              </v-layout>
            </template>

            <!-- 折叠板内容 -->
            <v-card>
              <v-card-text>
                <v-layout align-center justify-space-around row fill-height>
                  <v-flex>
                    <div class="line">
                      <div>币种</div>
                      <div style="margin-top: 15px">{{ card.currency }}</div>
                    </div>
                  </v-flex>
                  <v-flex>
                    <div class="line">
                      <div>
                        <span v-if="card.type === 2">额度</span>
                        <span v-else>余额</span>
                      </div>
                      <div style="margin-top: 15px">{{ card.money }}</div>
                    </div>
                  </v-flex>
                  <v-flex>
                    <div class="line">
                      <div>
                        <span v-if="card.type === 2">可用额度</span>
                        <span v-else>可用余额</span>
                      </div>
                      <div style="margin-top: 15px">
                        {{ card.availableMoney }}
                      </div>
                    </div>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CList",
  props: {
    cardList: Array
  },
  computed: {
    x() {
      return this.$store.state.windowSize.x;
    }
  },
  methods: {
    getType(type) {
      if (type === 1) {
        return "浙商银行借记卡";
      } else if (type === 2) {
        return "浙商银行信用卡";
      }
    },
    getIcon(type) {
      if (type === 0) {
        return "fa fa-credit-card";
      } else if (type === 1) {
        return "fa fa-credit-card";
      }
    }
  }
};
</script>

<style scoped>
.line {
  height: 50px;
}
</style>
